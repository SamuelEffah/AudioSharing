defmodule Gwen.Routes.Admin do
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
  
    get "/users" do
      allUsers = User.get_all_users()
      conn 
      |> put_resp_content_type("application/json")
      |> send_resp(200, Jason.encode!(%{users: allUsers}))
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
  