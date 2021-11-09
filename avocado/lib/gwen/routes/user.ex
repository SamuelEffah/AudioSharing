defmodule Gwen.Routes.User do
  use Plug.Router
  alias Hass.Schema.User
  alias Hass.Query.User
  require Logger

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

    Enum.each(bots, fn bot ->
      User.create_bot(bot)
    end

    )
    # Repo.insert_all(User, bots)
    send_resp(conn, 200, "Success!")
  end



  post "/follow" do
    data = conn.params["data"]
    user =  User.follow_user(data)
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{msg: "Successful"}))
  end


  get "/:username/followers" do
    Logger.info("get user followers #{username}")
    followers = User.get_user_followers(username)

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(followers))

  end

  get "/:username/following" do
    Logger.info("get user following #{username}")
    following = User.get_user_following(username)
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(following))
  end

  get "/:username/following/activity" do
    Logger.info("get user followers activity #{inspect(username)}")
    current_activity_following = User.get_user_current_activity_following(username)
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(current_activity_following))
  end



end
