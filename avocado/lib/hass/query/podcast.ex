defmodule Hass.Query.Podcast do
  import Ecto.Query, warn: false
  alias Hass.Repo
  alias Hass.Query.Episode
  alias Hass.Schema.Episode
  alias Hass.Schema.User, as: UserSchema
  alias Hass.Query.User

  alias Hass.Schema.Podcast

  require Logger

  def get() do
    from(p in Podcast)
  end

  def get_podcasts_by_user_id(user_id) do
    query =
      from p in Podcast,
      where: p.creator_id == ^user_id,
      select: p,
      limit: 10,
      order_by: [desc: p.inserted_at]
   Repo.all(query)
  end

  def get_podcast(podcast_id) do
    get()
    |> where([p], p.id == ^podcast_id)
    |> select([p], p)
    |> Repo.one()
  end

  @spec get_latest_podcasts :: any
  def get_latest_podcasts() do
    query =
      from p in Podcast,
      join: e in Episode,
      on: p.id == e.podcast_id,
      group_by: p.id,
      select: %{ p | num_of_eps: count(e.id)},
      limit: 10,
      order_by: [desc: p.inserted_at]
   Repo.all(query)

  end

  @spec get_top_podcasts(any) :: any
  def get_top_podcasts(num_of_listeners \\ 10) do
    query =
      from p in Podcast,
      join: e in Episode,
      on: p.id == e.podcast_id,
      join: u in UserSchema,
      on: p.creator_id == u.id,
      group_by: [p.id, e.file_name, u.id],
      where: p.num_of_listeners > ^num_of_listeners,
      select: %{ p | num_of_eps: count(e.id), creator_name: u.fullname ,episodes: e.file_name},
      limit: 10,
      order_by: [desc: p.inserted_at]

   Repo.all(query)

  end


  @spec get_podcast_by_filter(any) :: any
  def get_podcast_by_filter(filter) do
    query =
      from p in Podcast,
      join: e in Episode,
      on: p.id == e.podcast_id,
      group_by: p.id,
      where: ^filter == fragment("ANY(?)", p.tags),
      select: %{ p | num_of_eps: count(e.id)},
      limit: 10,
      order_by: [desc: p.inserted_at]
   Repo.all(query)
  end

  def create_podcast(data) do
    new_podcast = %Podcast{
      name: data["name"],
      description: data["description"],
      subtitle: data["subtitle"],
      poster_url: data["poster_url"],
      is_publish: true,
      creator_id: data["creator_id"],
      tags: data["tags"]

    }

    changeset = Podcast.changeset(new_podcast)

    case Repo.insert(changeset) do
      {:error, changeset} ->
        Logger.info("errors #{inspect(changeset.errors)}")
        {:error, "Something went wrong!"}

      {:ok, podcast} ->
        new_episode = %Episode{
          name: data["episodeName"],
          description: data["episodeDescription"],
          file_name: data["file_name"],
          podcast_id: podcast.id
        }
        episode_changeset = Episode.changeset(new_episode)
       episode_created = Repo.insert!(episode_changeset)
        if episode_created do
          User.increment_podcast(podcast.creator_id)
          Logger.info("Episode created #{inspect(episode_created)}")
        end
        Logger.info("created podcast #{inspect(podcast)}")
        {:created, "Podcast created!"}
    end
  end


  @spec get_podcast_episodes(any) :: any
  def get_podcast_episodes(id) do
    query =
      from p in Podcast,
      join: e in Episode,
      on: p.id == e.podcast_id,
      where: p.id == ^id,
      select: e,
      order_by: [desc: e.inserted_at]
   Repo.all(query)
  end

  def delete_podcast(podcast_id) do
    podcast_deleted =
      from(p in Podcast, where: p.id == ^podcast_id)
      |> Repo.delete_all()

    Logger.info("podcast deleted")
    {:ok, "Podcast deleted!"}
  end

  def update_podcast(data) do
    podcast = Repo.get_by(Podcast, id: data["id"])

    changeset =
      Ecto.Changeset.change(
        podcast,
        %{
          name: data["name"],
          description: data["description"],
          subtitle: data["subtitle"],
          poster_url: data["poster_url"]
        }
      )

    Repo.update!(changeset)
  end

  def increment_podcast_rating(podcast_id) do
    from(
      p in Podcast,
      update: [
        inc: [rating: 1]
      ],
      where: p.id == ^podcast_id
    )
    |> Repo.update_all([])

    {:ok, "Podcast rated!"}
  end

  def increment_podcast_listeners(podcast_id) do
    from(
      p in Podcast,
      update: [
        inc: [num_of_listeners: 1]
      ],
      where: p.id == ^podcast_id
    )
    |> Repo.update_all([])
  end
end
