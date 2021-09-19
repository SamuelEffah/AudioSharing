defmodule Gwen.Routes.Auth.Google do
  import Plug.Conn
  use Plug.Router
  require Logger

  alias Hass.Query.User, as: UserQuery



  ## TODO: error- redirect uri mismatch
  plug(:match)
  plug(:dispatch)

  get "/" do
    conn
    |> Plug.Conn.put_private(:ueberauth_request_options, %{
      callback_url: "http://localhost:4001/auth/google/callback",
      options: [
        default_scope: "email profile"
      ]
    })
    |> Ueberauth.Strategy.Google.handle_request!()
  end

  get "/callback" do
    conn
    |> fetch_query_params()
    |> Plug.Conn.put_private(:ueberauth_request_options, %{
      options: []
    })
    |> Ueberauth.Strategy.Google.handle_callback!()
    |> handle_callback()
  end

  def handle_callback(%{assigns: %{ueberauth_auth: auth}} = conn, params) do
   Logger.info("Login User: #{inspect(auth)}")


    conn
    |> send_resp(200, "google login")
  end

  def handle_callback(%Plug.Conn{assigns: %{ueberauth_failure: failure}} = conn) do
    Logger.warn("unhandled handle_callback #{inspect(failure)}")

    conn
    |> send_resp(404, "something went wrong failed")
  end

  def handle_callback(conn) do
    Logger.warn("unhandled handle_callback #{inspect(conn)}")

    conn
    |> send_resp(404, "something went wrong conn")
  end
end
