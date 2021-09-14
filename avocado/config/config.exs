use Mix.Config

config :avocado, ecto_repos: [Hass.Repo]

config :extwitter, :json_library, Jason

import_config "#{Mix.env()}.exs"
