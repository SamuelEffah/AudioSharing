defmodule Gwen.SocketHandler do
  require Logger

  alias Avocado.Utils.Auth
  alias Hass.Query.User
  alias Hass.Query.Episode
  alias Hass.Query.Podcast
  alias Avocado.UserSession

  @behaviour :cowboy_websocket

  defstruct callers: []

  @type state :: %__MODULE__{
          callers: [pid]
        }

  @impl true
  def init(req, _state) do
    Logger.info("new connection established....")

    state = %__MODULE__{
      callers: get_callers(req)
    }

    {:cowboy_websocket, req, state}
  end

  @impl true
  def websocket_init(state) do
    Process.put("$callers", state.callers)
    {:ok, state}
  end

  @impl true
  def websocket_handle({:text, "ping"}, state) do
    {[text: "pong"], state}
  end

  @impl true
  def websocket_handle({:text, json}, state) do
    with {:ok, message} <- Jason.decode(json),
         {:ok, user} <-
           Auth.authenticate(
             message["access_token"],
             message["refresh_token"]
           )
      do
      case message do
        %{"op" => "auth"} ->
          Logger.info("user now #{inspect(user)}")
          data = %{
            status: "successful",
            user: %{
              id: user.id,
              fullname: user.fullname,
              username: user.username,
              profile_url: user.profile_url,
              current_activity: user.current_activity,
              is_creator: user.is_creator,
              is_admin: user.is_admin,
              joined_on: user.joined_on,
              num_of_followers: user.num_of_followers,
              num_of_following: user.num_of_following,
              num_of_podcasts: user.num_of_podcasts
            }
          }

          auth_data = Jason.encode!(data)
          Logger.info("user now auth data #{inspect(auth_data)}")
          {:reply, {:text, auth_data}, state}

          %{"op" => "follow_user"} ->
           other_user_profile =  User.follow_user(message["follow_user"])

            data = Map.from_struct(other_user_profile)
            mod_data =
              data
              |> Map.put_new(:you_are_following, true)
              |> Map.put_new(:follows_you, false)

              other_user_profile = Jason.encode!(mod_data)

            Logger.info("Follow mod user #{inspect(mod_data)}")
            {:reply, {:text, other_user_profile}, state}
          %{"op" => "get_user"} ->
            data = message["get_user"]


            get_user_info = Map.from_struct(User.get_user_by_username(data["username"]))
            other_follow_info = User.get_info(data["me_id"], get_user_info.id)

            mod_data_get_user = Map.merge(get_user_info, other_follow_info)



            {:reply, {:text, Jason.encode!(mod_data_get_user)}, state}

          %{"op"=> "user_update"} ->

            data = message["user_update"]
             user_updated = User.edit_profile(data)

            {:reply, {:text, Jason.encode!(user_updated)}, state}


            %{"op"=> "create_podcast"} ->
              data = message["podcast"]
              Podcast.create_podcast(data)
              user_creator = User.promote_to_creator(data["creator_id"])

              Logger.info("user is already creaetor #{inspect(user_creator)} ")

              # y = %{
              #   id:  user_cached_updated.id,
              #   fullname:  user_cached_updated.fullname,
              #   username:  user_cached_updated.username,
              #   profile_url:  user_cached_updated.profile_url,
              #   current_activity:  user_cached_updated.current_activity,
              #   is_creator:  user_cached_updated.is_creator,
              #   is_admin:  user_cached_updated.is_admin,
              # }
              {:reply, {:text, Jason.encode!(user_creator)}, false}

            %{"op"=>"upload_episode"} ->
              data = message["episode"]
              Logger.info("episode new #{inspect(data)}")
              d = %{status: "successful"}
              add_episode = Episode.create_episode(data)
              all_episodes = Podcast.get_podcast_episodes(data["podcast_id"])

              {:reply, {:text, Jason.encode!(%{episodes: all_episodes})}, false}


      end


    else
      _ ->
        error_msg = %{status: "error", msg: "Auth failed"}
        {:reply, {:text, Jason.encode!(error_msg)}, state}
    end

  end

  @impl true
  def websocket_info(_info, state) do
    {:reply, state}
  end

  def exit(pid), do: send(pid, :exit)

  def terminate(_reason, _req, _state) do
    :ok
  end

  defp get_callers(_) do
    []
  end
end
