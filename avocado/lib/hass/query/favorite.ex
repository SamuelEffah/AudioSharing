defmodule Hass.Query.Favorite do
  import Ecto.Query, warn: false
  import Ecto.Changeset
  alias Hass.Repo

  alias Hass.Schema.Episode
  alias Hass.Schema.Podcast
  alias Hass.Schema.User
  alias Hass.Schema.Favorite

  require Logger

  def add_favorite(data) do

    fav = %Favorite{
      creator_id: data["creator_id"],
      podcast_id: data["podcast_id"]
    }
    Repo.insert(fav)
  end

  def remove_favorite(data) do
    query =
      from f in Favorite,
      where: f.creator_id == ^data["creator_id"],
      where: f.podcast_id == ^data["podcast_id"]
    Repo.delete_all(query)
  end

  def check_favorite(data) do

    favorite = from(
      f in Favorite,
      group_by: f.id,
      where: f.creator_id == ^data["creator_id"],
      where: f.podcast_id == ^data["podcast_id"],
      select: f
      )
      |> Repo.all()

    fav_count = Enum.count(favorite)

    if fav_count == 1 do
      %{is_favorite: true}
    else
      %{is_favorite: false}
    end
  end


end
