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
          is_creator: false
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
              AccessToken.generate_and_sign!(%{id: created_user.id}),
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



  def edit_profile(data) do
    data_struct = %{
      fullname: data["fullname"],
      username: data["username"],
      profile_url: data["profile_url"]
    }
    update_user_preview = %UserPreview{
      fullname: data["fullname"],
      username: data["username"],
      profile_url: data["profile_url"]
    }
    user_updated =
      Repo.get_by(User, id: data["user_id"])
      |> Ecto.Changeset.change(
        data_struct
      )
      |> Ecto.Changeset.put_embed(:user_preview, data_struct)
      |> Repo.update!(returning: [:user_preview])

      Logger.info("user update #{inspect(user_updated)}")
      user_updated

      # Logger.info("user info #{inspect(user_updated)}")

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
    new_bot_id = Ecto.UUID.generate()
    new_bot = %User{
      id: new_bot_id,
      fullname: bot["fullname"],
      username: bot["username"],
      profile_url: bot["profile_url"],
      email: bot["email"]
    }

    new_bot_preview = %UserPreview{
      id: new_bot_id,
      fullname: bot["fullname"],
      username: bot["username"],
      profile_url: bot["profile_url"],
      is_creator: false
    }
    changeset =
      User.changeset(new_bot)
      |> put_embed(:user_preview, new_bot_preview)
      |> Repo.insert!()

  end

  def get_user_by_username(username) do

  user =   get()
    |> where([u], u.username == ^username)
    |> select([u], u.user_preview)
    |> Repo.one()

    user
  end
  def logout() do
  end

  def get_user_current_activity_following(username) do
    user = Repo.get_by(User, username: username)
      query =
        from u in User,
        join: f in Follows,
        on: u.id == f.follower_id,
        where: f.user_id == ^user.id,
        where: not is_nil(u.current_activity),
        select: %{u.user_preview | current_activity: u.current_activity},
        order_by: [desc: f.inserted_at],
        limit: 3

        Repo.all(query)
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
    if user do
      query =
        from u in User,
        join: f in Follows,
        on: u.id == f.follower_id,
        where: f.user_id == ^user.id,
        select: u.user_preview,
        order_by: [desc: f.inserted_at]
       Repo.all(query)
    end


  end

  def follow_user(data) do
    #TODO: check if users are not following each

    follow = %Follows{
      user_id: data["user_id"],
      follower_id: data["other_user_id"]
    }

    change(follow)
    |> Repo.insert!()

    Logger.info("following user #{inspect(follow)}")
   {_, updated_user}=increment_followers(data["other_user_id"])
    increment_following(data["user_id"])

  updated_user
    |> Enum.at(0)
    |> elem(0)


  end


  def unfollow_user(data) do

   unfollow = from(
      f in Follows,
      where: f.user_id == ^data["user_id"],
      where: f.follower_id == ^data["other_user_id"]
    )
    |> Repo.delete_all()
    if unfollow do
      decrement_followers(data["other_user_id"])
      decrement_following(data["user_id"])
    end
    Logger.info("unfollow user #{inspect(unfollow)}")
  end



  def increment_followers(follower_id) do

    from(
      u in User,
      update: [
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
      select: {u.user_preview}

    )
    |> Repo.update_all([])

  end



  def increment_following(user_id) do

    from(
      u in User,
      update: [

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
      where: u.id == ^user_id
    )
      |> Repo.update_all([])

  end
  def decrement_followers(follower_id) do

    from(
      u in User,
      update: [
        set: [
          user_preview: fragment(
            """
            jsonb_set(user_preview, '{num_of_followers}',
            to_jsonb((user_preview->>'num_of_followers')::int - 1)
            , False)
            """
          )
        ]

      ],
      where: u.id == ^follower_id,

    )
    |> Repo.update_all([])

  end


  def decrement_following(user_id) do

    from(
      u in User,
      update: [

        set: [
          user_preview: fragment(
            """
            jsonb_set(user_preview, '{num_of_following}',
            to_jsonb((user_preview->>'num_of_following')::int - 1)
            , False)
            """
          )
        ],
      ],
      where: u.id == ^user_id
    )
      |> Repo.update_all([])

  end



  def increment_podcast(user_id) do

    from(
      u in User,
      update: [

        set: [
          user_preview: fragment(
            """
            jsonb_set(user_preview, '{num_of_podcasts}',
            to_jsonb((user_preview->>'num_of_podcasts')::int + 1)
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


  def get_info(me_id, other_user_id) do

    e = from(
      f in Follows,
      where:
      (f.follower_id == ^me_id and f.user_id == ^other_user_id)
       or
       (f.user_id == ^me_id and f.follower_id == ^other_user_id),
    )
    |> Repo.all()
    |> case do
      [_, _] ->
        %{follows_you: true, you_are_following: true}

      [%{user_id: ^me_id, follower_id: ^other_user_id}] ->
        %{follows_you: false, you_are_following: true}

      [%{user_id: ^other_user_id, follower_id: ^me_id}] ->
        %{follows_you: true, you_are_following: false}

      [] ->
        %{follows_you: false, you_are_following: false}
    end

  end
end
