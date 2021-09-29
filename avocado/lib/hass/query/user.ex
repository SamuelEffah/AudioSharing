defmodule Hass.Query.User do
  import Ecto.Query, warn: false
  import Ecto.Changeset
  alias Hass.Schema.User
  alias Hass.Schema.UserPreview
  alias Hass.Schema.Follows

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
        new_user_id = Ecto.UUID.generate()
        new_user = %User{
          id: new_user_id,
          fullname: user["name"],
          username: user["login"],
          profile_url: user["avatar_url"],
          email: user["email"],
          github_id: id
        }

        new_user_preview = %UserPreview{
          id: new_user_id,
          fullname: user["name"],
          username: user["login"],
          profile_url: user["avatar_url"],
          is_creator: false,
          joined_on: DataTime.utc_now()
        }

        changeset = User.changeset(new_user)
        inserted_user =
          changeset
          |> put_embed(:user_preview, new_user_preview)
          |> Repo.insert()

        case inserted_user do
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


  def create_bot(bot) do
    new_bot = %User{
      fullname: bot["fullname"],
      username: bot["username"],
      profile_url: bot["profile_url"],
      email: bot["email"]
    }

    changeset = User.changeset(new_bot)
    Repo.insert!(changeset)
  end

  def get_user_by_username(username) do
    get()
    |> where([u], u.username == ^username)
    |> Repo.one()

  end
  def logout() do
  end


  def get_user_followers(username) do
    user = Repo.get_by(User, username: username)
    query =
      from u in User,
      join: f in Follows,
      on: u.id == f.user_id,
      where: f.follower_id == ^user.id,
      select: u.user_preview,
      order_by: [desc: f.inserted_at]

     Repo.all(query)
  end


  def get_user_following(username) do
    user = Repo.get_by(User, username: username)
    query =
      from u in User,
      join: f in Follows,
      on: u.id == f.follower_id,
      where: f.user_id == ^user.id,
      select: u.user_preview,
      order_by: [desc: f.inserted_at]

     Repo.all(query)


  end

  def follow_user(data) do

    follow = %Follows{
      user_id: data["user_id"],
      follower_id: data["other_user_id"]
    }

    change(follow)
    |> Repo.insert!()
    increment_followers(data["other_user_id"])
    {_, updated_user}=increment_following(data["user_id"])

  updated_user
    |> Enum.at(0)
    |> elem(0)


  end



  def increment_followers(follower_id) do

    from(
      u in User,
      update: [
        inc: [num_of_followers: 1,
        ],
        set: [
          user_preview: fragment(
            """
            jsonb_set(user_preview, '{num_of_followers}',
            to_jsonb((user_preview->>'num_of_followers')::int + 1)
            , False)
            """
          )
        ]

      ],
      where: u.id == ^follower_id,

    )
    |> Repo.update_all([])

  end


  def increment_following(user_id) do

    from(
      u in User,
      update: [
        inc: [num_of_following: 1,
        ],
        set: [
          user_preview: fragment(
            """
            jsonb_set(user_preview, '{num_of_following}',
            to_jsonb((user_preview->>'num_of_following')::int + 1)
            , False)
            """
          )
        ],
      ],
      where: u.id == ^user_id,
      select: {u.user_preview}
    )
      |> Repo.update_all([])

  end


end
