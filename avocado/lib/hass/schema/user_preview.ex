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
    field(:current_activity, :string)
    field(:profile_url, :string)
    field(:is_admin, :boolean, default: false)
    field(:joined_on, :utc_datetime_usec)

  end


  def changeset(user_preview, params \\ %{}) do
    user_preview
    |> cast(params, [
      :id,
      :username,
      :fullname,
      :profile_url,
      :num_of_followers,
      :num_of_following,
      :num_of_podcasts,
      :is_creator,
      :is_admin
    ])
  end

  defimpl Jason.Encoder, for: __MODULE__ do
    @fields ~w(id fullname username is_creator current_activity num_of_followers
    num_of_following num_of_podcasts profile_url is_admin joined_on)a

    # defp transform_current_room(fields), do: fields

    def encode(user_preview, opts) do
      user_preview
      |> Map.take(@fields)
      |> Jason.Encoder.encode(opts)
    end
  end


end
