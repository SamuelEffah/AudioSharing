defmodule Hass.Repo.Migrations.RemoveEpisodeMediaType do
  use Ecto.Migration

  def change do
    alter table(:episodes) do
      remove(:media_type)
    end
  end
end
