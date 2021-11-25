defmodule Hass.Repo.Migrations.AddFavoritesTable do
  use Ecto.Migration

  def change do
    create table(:favorites) do
      add :podcast_id, references(:podcast, on_delete: :nilify_all, type: :uuid), null: false
      add :creator_id, references(:users, on_delete: :nilify_all, type: :uuid), null: false
      timestamps()
    end
  end
end
