import Config

config :logger, level: :info

database_url =
  System.get_env("DATABASE_URL") ||
  "postgres://sam:reginaKyei21@@localhost:5432/podcast"

config :avocado, Hass.Repo, url: database_url

# TODO: remove system environment variables and make
# dev deployment easier

config :ueberauth, Ueberauth.Strategy.Github.OAuth,
  client_id: "7b5815add92c64a075e5",
  client_secret: "a16a4c8b87981806ee61b16405e85be8ae8a0ab"

config :avocado,
  secret_key_base:
    "afion934hnifainiuheiankjsgn945njkabnjkngkjbnajkgiu4503bnfkag",
  github_id: "47938002",
  access_token_secret: "4ajnpOe4irknNjdrek9ir3mfFhe",
  refresh_token_secret: "ok54J34PKekjiwnbpIioqnps5Oebn"



config :joken,
  access_token_secret: "4ajnpOe4irknNjdrek9ir3mfFhe",
  refresh_token_secret: "ok54J34PKekjiwnbpIioqnps5Oebn"
