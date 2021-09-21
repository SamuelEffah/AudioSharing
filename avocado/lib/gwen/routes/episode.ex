defmodule Gwen.Routes.Episode do
  use Plug.Router
  alias Hass.Schema.Episode
  alias Hass.Query.Episode
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
   {:created, episode} = Episode.create_episode(data)
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{msg: episode}))
  end


  get "/:id" do
    episode = Episode.get_episode_by_id(id)
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{episode: episode}))
  end


  post "/edit" do
    data = conn.params["data"]
   {_, update_episode} = Episode.update_episode(data)
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{updated: update_episode}))
  end







end
