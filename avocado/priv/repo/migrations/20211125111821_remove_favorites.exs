defmodule Hass.Repo.Migrations.RemoveFavorites do
  use Ecto.Migration

  def change do
    alter table(:podcast) do
      remove(:is_favorite)
    end
  end
end
