defmodule Gwen.SocketHandler do
  require Logger

  alias Avocado.Utils.Auth
  alias Hass.Query.User

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
      case message do
        %{"op" => "auth"} ->
          data = %{
            status: "successful",
            user: %{
              id: user.id,
              fullname: user.fullname,
              username: user.username,
              profile_url: user.profile_url,
              current_activity: user.current_activity,
              is_creator: user.is_creator,
              is_admin: user.is_admin,
            }
          }

          auth_data = Jason.encode!(data)
          {:reply, {:text, auth_data}, state}

          %{"op" => "follow_user"} ->
           other_user_profile =  User.follow_user(message["follow_user"])

            data = Map.from_struct(other_user_profile)
            mod_data =
              data
              |> Map.put_new(:you_are_following, true)
              |> Map.put_new(:follows_you, false)

              other_user_profile = Jason.encode!(mod_data)

            Logger.info("Follow mod user #{inspect(mod_data)}")
            {:reply, {:text, other_user_profile}, state}
          %{"op" => "get_user"} ->
            data = message["get_user"]


            get_user_info = Map.from_struct(User.get_user_by_username(data["username"]))
            other_follow_info = User.get_info(data["me_id"], get_user_info.id)

            mod_data_get_user = Map.merge(get_user_info, other_follow_info)



            {:reply, {:text, Jason.encode!(mod_data_get_user)}, state}

          %{"op"=> "user_update"} ->

            data = message["user_update"]
             user_updated = User.edit_profile(data)

            {:reply, {:text, Jason.encode!(user_updated)}, state}

      end


    else
      _ ->
        error_msg = %{status: "error", msg: "Auth failed"}
        {:reply, {:text, Jason.encode!(error_msg)}, state}
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
