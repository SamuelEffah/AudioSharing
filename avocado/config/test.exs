import Config

database_url =
  System.get_env("DATABASE_URL") ||
   "postgres://sam:reginaKyei21@@localhost:5432/podcast"

config :avocado, Hass.Repo,
  url: database_url,
  pool: Ecto.Adapters.SQL.Sandbox