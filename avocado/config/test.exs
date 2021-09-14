import Config

database_url =
  System.get_env("DATABASE_URL") ||
    "postgres://postgres:kofimensah@localhost:5432/podcast"

config :avocado, Hass.Repo,
  url: database_url,
  pool: Ecto.Adapters.SQL.Sandbox
