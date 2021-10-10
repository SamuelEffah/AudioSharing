defmodule Avocado.UserSession do
  use GenServer, restart: :temporary

  @registry :user_registry
  @dynamic_supervisor :user_supervisor

  defmodule State do
    @type t :: %__MODULE__{
            id: String.t(),
            profile_url: String.t(),
            username: String.t(),
            fullname: String.t(),
            current_activity: String.t(),
            is_creator: Boolean.t(),
            is_admin: Boolean.t(),
            pid: pid()
          }

    defstruct id: nil,
              current_activity: nil,
              pid: nil,
              username: nil,
              fullname: nil,
              is_creator: nil,
              is_admin: nil,
              profile_url: nil
  end

  defp via(id), do: {:via, Registry, {@registry, id}}

  defp cast(id, params), do: GenServer.cast(via(id), params)
  defp call(id, params), do: GenServer.call(via(id), params)

  def start_supervised(initial_values) do
    callers = [self() | Process.get(:"$callers", [])]

    case DynamicSupervisor.start_child(
           @dynamic_supervisor,
           {__MODULE__, Keyword.merge(initial_values, callers: callers)}
         ) do
      {:error, {:already_started, pid}} -> {:ignored, pid}
      error -> error
    end
  end

  def child_spec(init), do: %{super(init) | id: Keyword.get(init, :id)}

  def count, do: Registry.count(@registry)

  def lookup(id), do: Registry.lookup(@registry, id)

  def start_link(init) do
    GenServer.start_link(__MODULE__, init, name: via(init[:id]))
  end

  def init(init) do
    Process.put(:"$callers", Keyword.get(init, :callers))
    {:ok, struct(State, init)}
  end

  def set(id, key, value), do: cast(id, {:set, key, value})

  def get(id, key), do: call(id, {:get, key})
  def get_all(id), do: call(id, :get_all)


  def handle_cast({:set, key, value}, state) do
    {:noreply, Map.put(state, key, value), state}
  end

  def handle_call({:get, key}, _reply, state) do
    {:reply, Map.get(state, key), state}
  end

  def handle_call(:get_all, _reply, state) do
    {:reply, Map.from_struct(state), state}
  end
end
