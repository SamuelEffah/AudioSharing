defmodule Hass.Schema.Podcast do
  use Ecto.Schema
  import Ecto.Changeset

  alias Hass.Schema.User

  @derive Jason.Encoder
  @timestamps_opts [type: :utc_datetime_usec]


  @primary_key {:id, :binary_id, autogenerate: true}
  schema "podcast" do
    field(:name, :string)
    field(:description, :string)
    field(:subtitle, :string, default: "")
    field(:is_publish, :boolean, default: false)
    field(:rating, :integer, default: 0)
    field(:num_of_listeners, :integer, default: 0)
    field(:num_of_reports, :integer, default: 0)
    field(:poster_url, :string)

    field(:tags, {:array, :string})

    field(:is_favorite, :boolean, virtual: true, default: false)
    field(:creator_name, :string, virtual: true)
    field(:num_of_eps, :integer, virtual: true)
    field(:episodes, {:array, :string}, virtual: true)

    belongs_to(:creator, User, foreign_key: :creator_id, type: :binary_id)
    timestamps()
  end

  def changeset(podcast, params \\ %{}) do
  podcast
  |> cast(params, [
    :id,
    :name,
    :description,
    :subtitle,
    :is_publish,
    :poster_url,
    :creator_id,
    :is_favorite,
    :num_of_reports,
    :num_of_listeners,
    :tags
  ])
  |> validate_required([
    :name,
    :description,
    :poster_url,
    :creator_id
  ])
  |> validate_length(:name, min: 3, max: 100)
  |> validate_length(:description, min: 3, max: 100)
  |> unique_constraint(:name)
end


defimpl Jason.Encoder, for: __MODULE__  do
  @fields ~w(id name description subtitle num_of_reports is_favorite creator_name poster_url episodes tags creator_id num_of_eps inserted_at)a

  defp transform(fields), do: fields

  def encode(podcast, opts) do

    podcast
    |> Map.take(@fields)
    |> transform()
    |> Jason.Encoder.encode(opts)
  end

end

end
