defmodule Hass.Schema.Episode do
  use Ecto.Schema
  import Ecto.Changeset

  alias Hass.Schema.Podcast

  @derive Jason.Encoder
  @timestamps_opts [type: :utc_datetime_usec]


  @primary_key {:id, :binary_id, autogenerate: true}
  schema "episodes" do
    field(:name, :string)
    field(:description, :string)
    field(:num_of_reports, :integer, default: 0)
    field(:is_removed, :boolean, default: false)
    field(:is_ban, :boolean, default: false)
    field(:num_of_listeners, :integer, default: 0)
    field(:file_name, :string)



     belongs_to(:podcast, Podcast, foreign_key: :podcast_id, type: :binary_id)
    timestamps()
  end

  def changeset(episode, params \\ %{}) do
  episode
  |> cast(params, [
    :id,
    :name,
    :file_name,
    :podcast_id,
    :description,
  ])
  |> validate_required([
    :name,
    :description,
    :file_name,
    :podcast_id
  ])
  |> validate_length(:name, min: 3, max: 100)
  |> validate_length(:description, min: 3, max: 100)

end


defimpl Jason.Encoder, for: __MODULE__  do
  @fields ~w(id name description file_name media_type inserted_at num_of_listeners podcast_id)a

  defp transform(fields), do: fields

  def encode(episode, opts) do

    episode
    |> Map.take(@fields)
    |> transform()
    |> Jason.Encoder.encode(opts)
  end

end

end
