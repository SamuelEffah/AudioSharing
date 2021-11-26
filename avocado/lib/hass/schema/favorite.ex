defmodule Hass.Schema.Favorite do
  use Ecto.Schema
  import Ecto.Changeset

  alias Hass.Schema.Podcast
  alias Hass.Schema.User

  @derive Jason.Encoder
  @timestamps_opts [type: :utc_datetime_usec]


  schema "favorites" do
     belongs_to(:podcast, Podcast, foreign_key: :podcast_id, type: :binary_id)
     belongs_to(:users, User, foreign_key: :creator_id, type: :binary_id)
     timestamps()
  end

  def changeset(favorite, params \\ %{}) do
  favorite
  |> cast(params, [
    :podcast_id,
    :id,
    :creator_id
  ])
  |> validate_required([
    :creator_id,
    :podcast_id
  ])


end


defimpl Jason.Encoder, for: __MODULE__  do
  @fields ~w(id creator_id podcast_id)a

  defp transform(fields), do: fields

  def encode(favorite, opts) do

    favorite
    |> Map.take(@fields)
    |> transform()
    |> Jason.Encoder.encode(opts)
  end

end

end
