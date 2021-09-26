defmodule Avocado.UserSession do
  use GenServer, restart: :temporary

  @registry :user_registry
  @dynamic_supervisor :user_supervisor

  defmodule State do
    @type t :: %__MODULE__{
            user_id: String.t(),
            profile_url: String.t(),
            username: String.t(),
            fullname: String.t(),
            current_activity: String.t(),
            pid: pid()
          }

    defstruct user_id: nil,
              current_activity: nil,
              pid: nil,
              username: nil,
              fullname: nil,
              profile_url: nil
  end

  defp via(user_id), do: {:via, Registry, {@registry, user_id}}

  defp cast(user_id, params), do: GenServer.cast(via(user_id), params)
  defp call(user_id, params), do: GenServer.call(via(user_id), params)

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

  def child_spec(init), do: %{super(init) | id: Keyword.get(init, :user_id)}

  def count, do: Registry.count(@registry)

  def lookup(user_id), do: Registry.lookup(@registry, user_id)

  def start_link(init) do
    GenServer.start_link(__MODULE__, init, name: via(init[:user_id]))
  end

  def init(init) do
    Process.put(:"$callers", Keyword.get(init, :callers))
    {:ok, struct(State, init)}
  end

  def set(user_id, key, value), do: cast(user_id, {:set, key, value})

  def get(user_id, key), do: call(user_id, {:get, key})
  def get_all(user_id), do: call(user_id, :get_all)


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
