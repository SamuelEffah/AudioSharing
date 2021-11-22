defmodule Hass.Query.Episode do
  import Ecto.Query, warn: false
  alias Hass.Repo

  alias Hass.Schema.Episode
  alias Hass.Schema.Podcast
  alias Hass.Schema.User

  require Logger

  def get() do
    from(e in Episode)
  end

  def get_episode_by_id(episode_id) do
    episode =
      get()
      |> where([e], e.id == ^episode_id)
      |> Repo.one()

    episode
  end

  def get_episode_num_listeners(episode_id) do
    get()
    |> where([e], e.id == ^episode_id)
    |> select([e], {e.num_of_listeners})
    |> Repo.all()
  end

  def get_all_episodes_by_podcast_id(podcast_id) do
    get()
    |> where([e], e.podcast_id == ^podcast_id)
    |> order_by([e], e.inserted_at)
    |> limit([], 10)
    |> select([e], {e.file_name, e.name, e.id, e.description})
    |> Repo.all()
  end

  def remove_episode(creator_id, podcast_id, episode_id) do
    podcast_query =
      from(p in Podcast,
        join: u in User,
        on: p.creator_id == u.id,
        where: p.id == ^podcast_id,
        select: p.id
      )

    is_creator_podcast = Repo.all(podcast_query)

    if is_creator_podcast do
      episode_deleted =
        from(e in Episode, where: e.id == ^episode_id)
        |> Repo.delete_all()

      {:ok, "Episode deleted"}
    else
      {:error, "Something went wrong!"}
    end
  end

  def create_episode(data) do
    new_episode = %Episode{
      name: data["name"],
      description: data["description"],
      file_name: data["file_name"],
      podcast_id: data["podcast_id"]
    }

    changeset = Episode.changeset(new_episode)

    case Repo.insert(changeset) do
      {:error, changeset} ->
        Logger.info("errors #{inspect(changeset.errors)}")
        {:error, "Something went wrong!"}

      {:ok, episode} ->
        Logger.info("added episode #{inspect(episode)}")
        {:created, "Episode created!"}
    end
  end

  def update_episode(data) do
    episode = Repo.get_by(Episode, id: data["id"])

    changeset =
      Ecto.Changeset.change(
        episode,
        %{
          name: data["name"],
          description: data["description"],
          file_name: data["file_name"],
          podcast_id: data["podcast_id"],
          media_type: data["media_type"]

        }
      )

   case  Repo.update(changeset, returning: true) do
    {:ok, updated_episode} ->
      {:ok, updated_episode}
    {:error, _} ->
      {:error, "Someting went wrong!"}
   end
  end
end
