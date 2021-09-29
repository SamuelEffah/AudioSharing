defmodule Gwen.Routes.User do
  use Plug.Router
  alias Hass.Schema.User
  alias Hass.Query.User


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

  get "/:username" do

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(User.get_user_by_username(username)))
  end
  post "/create" do
    data = conn.params["data"]

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(User.find_or_create_account(data)))
  end


  post "/bot" do
    bots = conn.params["bots"]
    IO.inspect bots
    Enum.each(bots, fn bot ->
      User.create_bot(bot)
    end

    )
    # Repo.insert_all(User, bots)
    send_resp(conn, 200, "Success!")
  end


end
