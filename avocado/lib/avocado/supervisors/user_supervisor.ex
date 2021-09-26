defmodule Avocado.Supervisors.UserSupervisor do
  use Supervisor

  @registry :user_registry
  @dynamic_supervisor :user_supervisor

  def start_link(init_arg) do
    Supervisor.start_link(__MODULE__, init_arg)
  end

  @impl true
  def init(_init_arg) do
    children = [
      {Registry, keys: :unique, name: @registry},
      {DynamicSupervisor, name: @dynamic_supervisor, strategy: :one_for_one}
    ]

    Supervisor.init(children, strategy: :one_for_one)
  end
end
