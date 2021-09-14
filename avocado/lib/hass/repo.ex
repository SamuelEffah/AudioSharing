defmodule Hass.Repo do
  use Ecto.Repo,
    otp_app: :avocado,
    adapter: Ecto.Adapters.Postgres
end
