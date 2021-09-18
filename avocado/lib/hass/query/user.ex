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

  def get_user_by_id(id) do
    user =
      get()
      |> where([u], u.id == ^id)
      |> Repo.one()

    user
  end

  def find_or_create_account(user, _provider \\ nil) do

    id = user["id"]

    # find or  create a user
    case get_user_by_id(id) do
      nil ->
        new_user = %User{
          fullname: user["fullname"],
          username: user["username"],
          profile_url: user["profile_url"],
          email: user["email"],
          github_id: user["id"]
        }

        changeset = User.changeset(new_user)

        case Repo.insert(changeset) do
          {:error, changeset} ->
            IO.inspect(changeset.errors)

            if changeset.errors[:username] do
              %{
                status: "failed",
                error: "Username is not available!"
              }
            else
              %{
                status: "failed",
                error: "Email is not available!"
              }
            end

          {:ok, created_user} ->
            %{
              status: "successful",
              access_token: AccessToken.generate_and_sign!(%{id: created_user.id}),
              refresh_token: RefreshToken.generate_and_sign!(%{id: created_user.id})
            }
        end

      existed_user ->
        %{
          status: "successful",
          access_token: AccessToken.generate_and_sign!(%{id: existed_user.id}),
          refresh_token: RefreshToken.generate_and_sign!(%{id: existed_user.id})
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
