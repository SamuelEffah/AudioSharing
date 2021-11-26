defmodule Hass.Schema.Report do
  use Ecto.Schema
  import Ecto.Changeset

  alias Hass.Schema.Podcast
  alias Hass.Schema.User

  @derive Jason.Encoder
  @timestamps_opts [type: :utc_datetime_usec]


  schema "reports" do
    field(:msg, :string)
    field(:is_resolve, :boolean, default: false)
     belongs_to(:podcast, Podcast, foreign_key: :podcast_id, type: :binary_id)
     belongs_to(:users, User, foreign_key: :user_id, type: :binary_id)
     timestamps()
  end

  def changeset(report, params \\ %{}) do
  report
  |> cast(params, [
    :podcast_id,
    :id,
    :msg,
    :is_resolve,
    :user_id
  ])
  |> validate_required([
    :user_id,
    :msg,
    :podcast_id
  ])


end


defimpl Jason.Encoder, for: __MODULE__  do
  @fields ~w(id user_id msg is_resolve podcast_id)a

  defp transform(fields), do: fields

  def encode(report, opts) do

    report
    |> Map.take(@fields)
    |> transform()
    |> Jason.Encoder.encode(opts)
  end

end

end
