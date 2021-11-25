defmodule Hass.Repo.Migrations.AddFavoritesPodcast do
  use Ecto.Migration

  def change do
    alter table(:podcast) do
      add :is_favorite, :boolean
    end

  end
end
