defmodule Gwen.Routes.Podcast do
  use Plug.Router
  alias Hass.Schema.Podcast
  alias Hass.Query.Podcast
  alias Hass.Query.Favorite
  alias Hass.Query.Report
  alias Hass.Repo
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

  post "/create" do
    data = conn.params["data"]
    Enum.each(data, fn d ->
      IO.inspect(d)
      {:created, podcast} = Podcast.create_podcast(d)
    end
    )

    {:created, podcast} = Podcast.create_podcast(data)
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{msg: podcast}))
  end


  get "/:id" do

    user_podcasts = Podcast.get_podcasts_by_user_id(id)
    Logger.info("user podcasts #{inspect(user_podcasts)}")
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{podcasts: user_podcasts}))
  end

  get "/episodes/:id" do
    podcast_episodes = Podcast.get_podcast_episodes(id)
    Logger.info("podcast episodes #{inspect(podcast_episodes)}")
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{episodes: podcast_episodes}))
  end

  post "/edit" do
    data = conn.params["data"]

    update_podcast = Podcast.update_podcast(data)

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{updated: update_podcast}))
  end

  get "/favorite/:id" do
    podcasts = Podcast.get_podcast_by_favorite(id)

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{podcasts: podcasts}))
  end
  post "/favorite" do
    data = conn.params["data"]
    if data["act"] == "add" do
      update_podcast = Favorite.add_favorite(data)

    else
      update_podcast = Favorite.remove_favorite(data)

    end

    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{status: true}))
  end

  post "/check-favorite" do
    data = conn.params["data"]
    fav_check = Favorite.check_favorite(data)
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(fav_check))
  end


  post "/issue/report" do
    data = conn.params["data"]
    report = Report.issue_report(data)
    Logger.info("report #{inspect(data)}")
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{report: "successful"}))
  end

  get "/filter/:query" do
    IO.inspect(query)
    results = Podcast.get_podcast_by_filter(query)
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{podcasts: results}))
  end

  get "explore/top-podcasts" do
    results = Podcast.get_top_podcasts()
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{podcasts: results}))
  end

  get "explore/just-in" do
    results = Podcast.get_latest_podcasts()
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{podcasts: results}))
  end


end
