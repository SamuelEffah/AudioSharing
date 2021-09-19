defmodule Gwen.Routes.Podcast do
  use Plug.Router
  alias Hass.Schema.Podcast
  alias Hass.Query.Podcast
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
   {:created, podcast} = Podcast.create_podcast(data)
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{msg: podcast}))
  end


  get "/:id" do
    user_podcasts = Podcast.get_podcasts_by_user_id(id)
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{podcasts: user_podcasts}))
  end


  post "/edit" do
    data = conn.params["data"]
   update_podcast = Podcast.update_podcast(data)
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{updated: update_podcast}))
  end




end
