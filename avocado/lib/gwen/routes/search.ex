defmodule Gwen.Routes.Search do
  use Plug.Router

  alias Hass.Query.User, as: UserQuery

  plug(Plug.Parsers,
    parsers: [:urlencoded, :json],
    json_decoder: Jason
  )

  plug(Gwen.Cors)
  plug(:match)
  plug(:dispatch)


  get "/:query" do
    inspect(query)
  query =
    if String.at(query, 0) == "@",
    do: String.slice(query, 1, String.length(query)) ,
    else: query

  results = UserQuery.search_for_podcast_or_user(query)

  conn
  |> put_resp_content_type("application/json")
  |> send_resp(200, Jason.encode!(%{results: results}))
  end




end
