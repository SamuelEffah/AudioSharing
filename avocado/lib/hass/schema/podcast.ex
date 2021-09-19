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
    field(:poster_url, :string)



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
    :poster_url,
    :creator_id
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
  @fields ~w(id name description subtitle poster_url creator_id)a

  defp transform(fields), do: fields

  def encode(podcast, opts) do

    podcast
    |> Map.take(@fields)
    |> transform()
    |> Jason.Encoder.encode(opts)
  end

end

end
