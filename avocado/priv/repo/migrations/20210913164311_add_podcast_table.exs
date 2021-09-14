defmodule Hass.Repo.Migrations.AddPodcastTable do
  use Ecto.Migration

  def change do
    create table(:podcast, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :name, :string, null: false
      add :description, :text, null: false
      add :subtitle, :text, default: ""
      add :is_publish, :boolean, default: false
      add :rating, :integer
      add :num_of_listeners, :integer, default: 0
      add :creator_id, references(:users, on_delete: :nilify_all, type: :uuid), null: false
      add :poster_url, :string, null: false

      timestamps()
    end

    create unique_index(:podcast, [:name])
  end
end
