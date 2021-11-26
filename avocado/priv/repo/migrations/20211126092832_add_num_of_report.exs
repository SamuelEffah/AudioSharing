defmodule Hass.Repo.Migrations.AddNumOfReport do
  use Ecto.Migration

  def change do
    alter table(:podcast) do
      add :num_of_reports, :integer
    end

  end
end
