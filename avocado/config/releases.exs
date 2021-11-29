import Config

database_url =
  System.get_env("DATABASE_URL") ||
    raise("""
    environment variable DATABASE_URL is missing.
    For example: ecto://USER:PASS@HOST/DATABASE
    """)

    config :avocado, Hass.Repo, url: database_url

config :ueberauth, Ueberauth.Strategy.Github.OAuth,
client_id:
System.get_env("GITHUB_CLIENT_ID") ||
  raise("""
  environment variable GITHUB_CLIENT_ID is missing.
  Create an oauth application on GitHub to get one
  """),
client_secret:
System.get_env("GITHUB_CLIENT_SECRET") ||
  raise("""
  environment variable GITHUB_CLIENT_SECRET is missing.
  Create an oauth application on GitHub to get one
  """)

config :avocado,
  secret_key_base:
  System.get_env("SECRET_KEY_BASE") ||
  raise("""
  environment variable SECRET_KEY_BASE is missing.
  """),
  github_id:
    System.get_env("GITHUB_ID") || raise("""
    environment variable GITHUB ID is missing.
    """),

  access_token_secret:
    System.get_env("ACCESS_TOKEN_SECRET") ||
   raise("""
    environment variable ACCESS_TOKEN_SECRET is missing.
    type some random characters to create one
    """),
  refresh_token_secret:
    System.get_env("REFRESH_TOKEN_SECRET") ||
    raise("""
    environment variable REFRESH_TOKEN_SECRET is missing.
    type some random characters to create one
    """)




config :joken,
  access_token_secret:
  System.get_env("ACCESS_TOKEN_SECRET") ||
    raise("""
    environment variable ACCESS_TOKEN_SECRET is missing.
type some random characters to create one
"""),
  refresh_token_secret:
    System.get_env("REFRESH_TOKEN_SECRET") ||
      raise("""
  environment variable REFRESH_TOKEN_SECRET is missing.
  type some random characters to create one
  """)
