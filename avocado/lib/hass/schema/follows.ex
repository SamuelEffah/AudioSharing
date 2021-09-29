defmodule Hass.Schema.Follows do
  use Ecto.Schema
  import Ecto.Changeset


  schema "follows" do
    belongs_to(:following, User, foreign_key: :user_id, type: :binary_id)
    belongs_to(:follower, User, foreign_key: :follower_id, type: :binary_id)

    timestamps()
  end

  def changeset(follow, params \\ %{}) do
    follow
    |> cast(params, [
      :user_id,
      :follower_id
    ])
    |> validate_required([:user_id, :follower_id])
  end
end
