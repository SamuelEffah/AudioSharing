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
        port: 4001,
        dispatch: dispatch()
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
