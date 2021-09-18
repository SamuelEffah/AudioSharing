defmodule Avocado.Application do

use Application

@impl true
def start(_typ, _args) do
  children = [
    {Hass.Repo, []},
    Plug.Cowboy.child_spec(
      scheme: :http,
      plug: Gwen,
      options: [
        port: 4001
      ]
    )
  ]
  opts = [strategy: :one_for_one, name: Avocado.Supervisor]
  Supervisor.start_link(children, opts)
end

defp dispatch do
[
  {:_, [
    {:_, Plug.Cowboy.Handler, {Gwen, []}}
  ]}
]
end
end
