defmodule Gwen do

  alias Gwen.Routes.User
  alias Gwen.Routes.Podcast
  alias Gwen.Routes.Search
  alias Gwen.Routes.Episode
  alias Gwen.Routes.Auth.Github
  alias Gwen.Routes.Auth.Google
  use Plug.Router

  plug(:match)
  plug(:dispatch)

  options _ do
    send_resp(conn, 200, "")
  end


  forward("/users", to: User)
  forward("/podcast", to: Podcast)
  forward("/search", to: Search)
  forward("/episode", to: Episode)
  forward("/auth/github", to: Github)
  forward("/auth/google", to: Google)



  get _ do
    send_resp(conn, 404, "not found")
  end

  post _ do
    send_resp(conn, 404, "not found")
  end


end
