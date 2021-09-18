defmodule Hass.Repo.Migrations.AddUserTable do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :github_id, :string
      add :google_id, :string
      add :email, :string, null: false
      add :fullname, :string, null: false
      add :username, :string, null: false
      add :is_ban, :boolean, default: false
      add :is_online, :boolean
      add :is_admin, :boolean, default: false
      add :profile_url, :string
      add :current_activity, :string
      add :is_creator, :boolean, default: false
      add :ip, :string
      timestamps()
    end
    create unique_index(:users, [:email, :username])

  end
end
