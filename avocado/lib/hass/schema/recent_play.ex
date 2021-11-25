defmodule Hass.Schema.RecentPlay do
  use Ecto.Schema
  import Ecto.Changeset

  alias Hass.Schema.Podcast
  alias Hass.Schema.User

  @derive Jason.Encoder
  @timestamps_opts [type: :utc_datetime_usec]


  schema "recent_play" do
     field(:time_stopped, :integer)
     belongs_to(:podcast, Podcast, foreign_key: :podcast_id, type: :binary_id)
     belongs_to(:users, User, foreign_key: :creator_id, type: :binary_id)
    timestamps()
  end

  def changeset(episode, params \\ %{}) do
  episode
  |> cast(params, [
    :podcast_id,
    :creator_id,
    :time_stopped
  ])
  |> validate_required([
    :creator_id,
    :podcast_id,
    :time_stopped
  ])


end


defimpl Jason.Encoder, for: __MODULE__  do
  @fields ~w(id time_stopped creator_id podcast_id)a

  defp transform(fields), do: fields

  def encode(recent, opts) do

    recent
    |> Map.take(@fields)
    |> transform()
    |> Jason.Encoder.encode(opts)
  end

end

end
