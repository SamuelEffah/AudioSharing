defmodule Hass.Repo.Migrations.AddEpisodesTable do
  use Ecto.Migration

  def change do
    create table(:episodes, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :name, :string, null: false
      add :description, :text, null: false
      add :podcast_id, references(:podcast, on_delete: :nilify_all, type: :uuid), null: false
      add :num_of_reports, :integer, default: 0
      add :file_name, :string, null: false
      add :media_type, :string
      add :num_of_listeners, :integer, default: 0
      add :is_removed, :boolean, default: false
      add :is_ban, :boolean, default: false

      timestamps()
    end
  end
end
