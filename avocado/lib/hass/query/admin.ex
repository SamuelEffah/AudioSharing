defmodule Hass.Query.Admin do
  import Ecto.Query, warn: false
  alias Hass.Repo

  alias Hass.Schema.Episode
  alias Hass.Schema.Podcast
  alias Hass.Schema.User
  alias Hass.Schema.Favorite
  alias Hass.Schema.UserPreview

  require Logger




  def check_admin(admin_id) do
    admin_user =
      from( u in User,
      where: u.id == ^admin_id,
      where: u.is_admin == true,
      select: u
      )
      |> Repo.all()
    admin_user
  end

  def get_users(admin_id) do
    admin_user = check_admin(admin_id)

    if Enum.count(admin_user)  == 1 do
      query =
        from u in User,
        where: u.id != ^admin_id,
        select: u

      Repo.all(query)
    end
  end

  def promote_to_admin(data) do
    admin_user = check_admin(data["admin_id"])

    if Enum.count(admin_user)  == 1 do

      data_struct = %{
        is_admin: true
      }
      update_user_preview = %UserPreview{
        is_admin: true
      }
      user_updated =
        Repo.get_by(User, id: data["user_id"])
        |> Ecto.Changeset.change(
          data_struct
        )
        |> Ecto.Changeset.put_embed(:user_preview, data_struct)
        |> Repo.update!(returning: [:user_preview])
        if user_updated.id == data["user_id"] do
            %{status: "successful", user:  user_updated}

        else
          %{status: "failed", msg: "Something went wrong"}
        end
    end
  end



    def active_users(admin_id) do
      admin_user = check_admin(admin_id)
      if Enum.count(admin_user) == 1 do
        active_users =
          from(
            u in User,
            where: u.is_active == true,
            select: u
          )
          |> Repo.all()
         active_users
      end
      []
    end


    def ban_user(data) do
      admin_user = check_admin(data["admin_id"])
      if Enum.count(admin_user) == 1 do
        data_struct = %{
          is_ban: true
        }
        update_user_preview = %UserPreview{
          is_ban: true
        }
        user_updated =
          Repo.get_by(User, id: data["user_id"])
          |> Ecto.Changeset.change(
            data_struct
          )
          |> Ecto.Changeset.put_embed(:user_preview, data_struct)
          |> Repo.update!(returning: [:user_preview])

          if user_updated.id == data["user_id"] do
              %{status: "successful", user:  user_updated}

          else
            %{status: "failed", msg: "Something went wrong"}
          end
      end

    end

end
