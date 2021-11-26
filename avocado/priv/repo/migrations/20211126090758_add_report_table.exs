defmodule Hass.Repo.Migrations.AddReportTable do
  use Ecto.Migration

  def change do
    create table(:reports) do
      add :msg, :text, null: false
      add :is_resolve, :boolean
      add :podcast_id, references(:podcast, on_delete: :nilify_all, type: :uuid), null: false
      add :user_id, references(:users, on_delete: :nilify_all, type: :uuid), null: false
      timestamps()
    end
  end
end
