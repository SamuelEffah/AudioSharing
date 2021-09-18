use Mix.Config

config :avocado, ecto_repos: [Hass.Repo]


import_config "#{Mix.env()}.exs"
