defmodule Gwen.Routes.User do
  use Plug.Router
  alias Hass.Schema.User
  alias Hass.Query.User
  alias Hass.Repo

  plug(Plug.Parsers,
    parsers: [:urlencoded, :json],
    json_decoder: Jason
  )

  plug(Gwen.Cors)
  plug(:match)
  plug(:dispatch)

  get "/" do
    send_resp(conn, 200, "world")
  end

  post "/create" do
    data = conn.params["data"]

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(User.find_or_create_account(data)))
  end


end
