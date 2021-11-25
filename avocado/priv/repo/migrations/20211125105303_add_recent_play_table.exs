defmodule Hass.Repo.Migrations.AddRecentPlayerTable do
  use Ecto.Migration

  def change do
    create table(:recent_play) do
      add :time_stopped, :integer
      add :podcast_id, references(:podcast, on_delete: :nilify_all, type: :uuid), null: false
      add :creator_id, references(:users, on_delete: :nilify_all, type: :uuid), null: false
      timestamps()
    end
  end
end
