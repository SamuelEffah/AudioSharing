defmodule Hass.Repo.Migrations.AddPodcastTags do
  use Ecto.Migration

  def change do
    alter table(:podcast) do
      add :tags, {:array, :string}
    end

  end
end
