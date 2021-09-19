import Config

config :ueberauth, Ueberauth.Strategy.Github.OAuth,
  client_id: "7b5815add92c64a075e5",
  client_secret: "ba16a4c8b87981806ee61b16405e85be8ae8a0ab"

config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  client_id: "220038367994-mivg9tvc70hrrrhv6iidnihcc2nmlnuf.apps.googleusercontent.com",
  client_secret: "92tpE3bkx3AcnGaOAgPfd9b8"

config :joken,
  default_signer: "aj43WnpOehr944irknNjdrek9ir3m",
  access_token_secret: "4ajnpOe4irknNjdrek9ir3mfFhe",
  refresh_token_secret: "ok54J34PKekjiwnbpIioqnps5Oebn"
