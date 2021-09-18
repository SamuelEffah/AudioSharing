defmodule Gwen do

  alias Gwen.Routes.User
  alias Gwen.Routes.Auth.Github
  use Plug.Router
  alias Hass.Query.User, as: UserQuery

  plug(:match)
  plug(:dispatch)

  forward("/users", to: User)
  forward("/auth/github", to: Github)

  get "/search/:query" do
    query =
      if String.at(query, 0) == "@",
      do: String.slice(query, 1, String.length(query)) ,
      else: query

    results = UserQuery.search_for_podcast_or_user(query)
    IO.inspect(results)
    conn
    |> put_resp_content_type("application/json")
    |> send_resp(200, Jason.encode!(%{results: results}))
  end

  get _ do
    send_resp(conn, 404, "not found")
  end

  post _ do
    send_resp(conn, 404, "not found")
  end


end
