defmodule Avocado.Application do

use Application

@impl true
def start(_typ, _args) do
  children = [
    Avocado.Supervisors.UserSupervisor,
    {Hass.Repo, []},
    Plug.Cowboy.child_spec(
      scheme: :http,
      plug: Gwen,
      options: [
        port: String.to_integer(System.get_env("PORT") || "4001"),
        dispatch: dispatch(),
        protocol_options: [idle_timeout: :infinity]
      ]
    )
  ]
  opts = [strategy: :one_for_one, name: Avocado.Supervisor]
  Supervisor.start_link(children, opts)
end

defp dispatch do
[
  {:_, [
    {"/socket", Gwen.SocketHandler, []},
    {:_, Plug.Cowboy.Handler, {Gwen, []}}
  ]}
]
end
end
