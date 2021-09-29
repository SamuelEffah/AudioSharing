defmodule Hass.Schema.UserPreview do
  use Ecto.Schema
  import Ecto.Changeset


  @primary_key false

  embedded_schema do
    field(:id, :binary_id, primary_key: true)
    field(:username, :string)
    field(:fullname, :string)
    field(:num_of_followers, :integer, default: 0)
    field(:num_of_following, :integer, default: 0)
    field(:num_of_podcasts, :integer, default: 0)
    field(:is_creator, :boolean, default: false)
    field(:joined_on, :utc_datetime_usec)
    field(:profile_url, :string)

  end


  def changeset(user_preview, params \\ %{}) do
    user_preview
    |> cast(params, [
      :id,
      :username,
      :fullname,
      :joined_on,
      :profile_url,
      :num_of_followers,
      :num_of_following,
      :num_of_podcasts,
      :is_creator
    ])
  end

  defimpl Jason.Encoder, for: __MODULE__ do
    @fields ~w(id fullname joined_on username is_creator num_of_followers
    num_of_following num_of_podcasts profile_url)a

    # defp transform_current_room(fields), do: fields

    def encode(user_preview, opts) do
      user_preview
      |> Map.take(@fields)
      |> Jason.Encoder.encode(opts)
    end
  end


end