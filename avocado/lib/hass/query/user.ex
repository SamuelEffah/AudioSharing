defmodule Hass.Query.User do
  import Ecto.Query, warn: false
  alias Hass.Schema.User

  alias Hass.Repo
  require Logger
  alias Avocado.Utils.AccessToken
  alias Avocado.Utils.RefreshToken

  def get() do
    from(u in User)
  end

  def get_all_users() do
    get()
    |> Repo.all()
  end

  def get_user_by_id(id, provider \\ nil) do
    case provider do
      nil ->
          get()
          |> where([u], u.id == ^id)
          |> Repo.one()

      "github" ->
        get()
          |> where([u], u.github_id == ^id)
          |> Repo.one()

      "google" ->
        get()
        |> where([u], u.google_id == ^id)
        |> Repo.one()
    end

  end

  def find_or_create_account(user, provider \\ nil) do
    id = Integer.to_string(user["id"])

    # find or  create a user
    case get_user_by_id(id, provider) do
      nil ->
        new_user = %User{
          fullname: user["name"],
          username: user["login"],
          profile_url: user["avatar_url"],
          email: user["email"],
          github_id: id
        }

        changeset = User.changeset(new_user)

        case Repo.insert(changeset) do
          {:error, changeset} ->
            IO.inspect(changeset.errors)

            if changeset.errors[:username] do
              {
                :failed,
                error: "Username is not available!"
              }
            else

              {
                :failed,
                error: "Email is not available!"
              }
            end

          {:ok, created_user} ->
            {
             :created,
              RefreshToken.generate_and_sign!(%{id: created_user.id})
            }
        end

      existed_user ->
        {
          :existed,
          tokens: {
            AccessToken.generate_and_sign!(%{id: existed_user.id}),
            RefreshToken.generate_and_sign!(%{id: existed_user.id})
          }
          #

        }
    end
  end

  def search_for_podcast_or_user(user_or_podcast) do
    search_term = "%" <> user_or_podcast <> "%"
    query = from(u in User)

    query
    |> where([u], ilike(u.username, ^search_term))
    |> or_where([u], ilike(u.fullname, ^search_term))
    |> order_by([u], desc: u.fullname)
    |> limit([], 10)
    |> select([u], u)
    |> Repo.all()
  end

  def logout() do
  end
end
