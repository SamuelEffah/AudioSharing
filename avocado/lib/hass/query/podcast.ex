defmodule Hass.Query.Podcast do
  import Ecto.Query, warn: false
  alias Hass.Repo

  alias Hass.Schema.Podcast

  require Logger

  def get() do
    from(p in Podcast)
  end

  def get_podcasts_by_user_id(user_id) do
    podcasts =
      get()
      |> where([p], p.creator_id == ^user_id)
      |> order_by([p], desc: p.inserted_at)
      |> limit([], 10)
      |> select([p], p)
      |> Repo.all()

    podcasts
  end

  def get_podcast(podcast_id) do
    get()
    |> where([p], p.id == ^podcast_id)
    |> select([p], p)
    |> Repo.one()
  end

  def get_latest_podcasts() do
    get()
    |> order_by([p], desc: p.inserted_at)
    |> limit([], 10)
    |> select([p], p)
    |> Repo.all()
  end

  def get_top_podcasts(num_of_listeners \\ 10) do
    get()
    |> where([p], p.num_of_listeners > ^num_of_listeners)
    |> limit([], 10)
    |> select([p], p)
    |> Repo.all()
  end

  def create_podcast(data) do
    new_podcast = %Podcast{
      name: data["name"],
      description: data["description"],
      subtitle: data["subtitle"],
      poster_url: data["poster_url"],
      is_publish: data["is_publish"],
      creator_id: data["creator_id"]
    }

    changeset = Podcast.changeset(new_podcast)

    case Repo.insert(changeset) do
      {:error, changeset} ->
        Logger.info("errors #{inspect(changeset.errors)}")
        {:error, "Something went wrong!"}

      {:ok, podcast} ->
        Logger.info("created podcast #{inspect(podcast)}")
        {:created, "Podcast created!"}
    end
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
