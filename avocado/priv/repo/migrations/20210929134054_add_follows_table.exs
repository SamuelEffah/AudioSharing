defmodule Hass.Repo.Migrations.AddFollowsTable do
  use Ecto.Migration

  def change do
    create table(:follows) do
      add :user_id, references(:users, type: :uuid)
      add :follower_id, references(:users, type: :uuid)
      timestamps()
    end
  end
end
