defmodule Gwen.SocketHandler do
  require Logger

  alias Avocado.Utils.Auth

  @behaviour :cowboy_websocket

  defstruct callers: []

  @type state :: %__MODULE__{
          callers: [pid]
        }

  @impl true
  def init(req, _state) do
    Logger.info("new connection established....")

    state = %__MODULE__{
      callers: get_callers(req)
    }

    {:cowboy_websocket, req, state}
  end

  @impl true
  def websocket_init(state) do
    Process.put("$callers", state.callers)
    {:ok, state}
  end

  @impl true
  def websocket_handle({:text, "ping"}, state) do
    {[text: "pong"], state}
  end

  @impl true
  def websocket_handle({:text, json}, state) do
    with {:ok, message} <- Jason.decode(json),
         {:ok, user} <-
           Auth.authenticate(
             message["access_token"],
             message["refresh_token"]
           )
      do
      data = %{
        status: "successful",
        user: %{
          fullname: user.fullname,
          username: user.username,
          profile_url: user.profile_url,
          current_activity: user.current_activity
        }
      }

      auth_data = Jason.encode!(data)
      Logger.info("user info #{inspect(auth_data)}")

      {:reply, {:text, auth_data}, state}
    else
      _ -> {:reply, {:text, "something went wrong"}, state}
    end

  end

  @impl true
  def websocket_info(_info, state) do
    {:reply, state}
  end

  def exit(pid), do: send(pid, :exit)

  def terminate(_reason, _req, _state) do
    :ok
  end

  defp get_callers(_) do
    []
  end
end
