defmodule Gwen.Routes.Auth.Github do
  import Plug.Conn
  use Plug.Router
  require Logger

  alias Hass.Query.User, as: UserQuery

  plug(:match)
  plug(:dispatch)

  get "/" do
    conn
    |> Plug.Conn.put_private(:ueberauth_request_options, %{
      callback_url: "http://localhost:4001/auth/github/callback",
      options: [
        default_scope: "read:user,user:email"
      ]
    })
    |> Ueberauth.Strategy.Github.handle_request!()
  end

  get "/callback" do
    conn
    |> fetch_query_params()
    |> Plug.Conn.put_private(:ueberauth_request_options, %{
      options: []
    })
    |> Ueberauth.Strategy.Github.handle_callback!()
    |> handle_callback()
  end

  def handle_callback(
        %Plug.Conn{private: %{github_user: user, github_token: %{access_token: access_token}}} =
          conn
      ) do
    # Logger.info("Login User: #{inspect(user)}")
    {_, tokens: {a, r}} =
      UserQuery.find_or_create_account(
        %{
          user
          | "email" => Avocado.Utils.GetEmail.get_email(user["emails"])
        },
        "github"
      )

    conn
    |> Gwen.Redirect.redirect("http://localhost:3000/?a=" <> a <> "&r=" <> r)
  end

  def handle_callback(%Plug.Conn{assigns: %{ueberauth_failure: failure}} = conn) do
    Logger.warn("unhandled handle_callback #{inspect(failure)}")

    conn
    |> send_resp(404, "something went wrong")
  end

  def handle_callback(conn) do
    Logger.warn("unhandled handle_callback #{inspect(conn)}")

    conn
    |> send_resp(404, "something went wrong")
  end
end
