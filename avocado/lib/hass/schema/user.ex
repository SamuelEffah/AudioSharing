defmodule Hass.Schema.User do
  use Ecto.Schema
  import Ecto.Changeset


  @derive Jason.Encoder
  @timestamps_opts [type: :utc_datetime_usec]

  @type t :: %__MODULE__{
    id: Ecto.UUID.t(),
    github_id: String.t(),
    google_id: String.t(),
    fullname: String.t(),
    email: String.t(),
    username: String.t(),
    profile_url: String.t(),
    ip:  String.t(),
    current_activity:  String.t(),
    is_online: boolean(),
    is_ban: boolean(),
    is_creator: boolean(),
    is_admin: boolean(),

  }



  @primary_key {:id, :binary_id, autogenerate: true}
  schema "users" do
    field(:github_id, :string)
    field(:google_id, :string)
    field(:email, :string)
    field(:fullname, :string)
    field(:username, :string)
    field(:is_ban, :boolean, default: false)
    field(:is_online, :boolean)
    field(:is_admin, :boolean, default: false)
    field(:profile_url, :string, default: "")
    field(:current_activity, :string)
    field(:is_creator, :boolean)
    field(:ip, :string)

    timestamps()
  end


  @doc false
  def changeset(user, params \\ %{}) do

    user
    |> cast(params, [
      :id,
      :email,
      :fullname,
      :username,
      :profile_url,
      :github_id,
      :google_id

      ])
      |> validate_required([
        :email,
        :fullname,
        :username

      ])
      |> validate_format(:email, ~r/@/)
      |> validate_required([
        :fullname,
        :username,
        :email
      ])
      |> validate_length(:username, min: 3, max: 50)
      |> validate_length(:fullname, min: 3, max: 50)
      |> unique_constraint(:username, name: :users_email_username_index)
      |> unique_constraint(:email, name: :users_email_username_index)
  end


  defimpl Jason.Encoder, for: __MODULE__ do
    @fields ~w(id fullname username email current_activity is_admin is_online
    is_creator)a


     defp transform(fields), do: fields

     def encode(user, opts) do
      user
      |> Map.take(@fields)
      |> transform()
      |> Jason.Encoder.encode(opts)
     end
  end

end
