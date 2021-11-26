defmodule Gwen.Routes.Admin do
    use Plug.Router
    alias Hass.Query.Admin
    alias Hass.Repo


  require Logger
    plug(Plug.Parsers,
      parsers: [:urlencoded, :json],
      json_decoder: Jason
    )

    plug(Gwen.Cors)
    plug(:match)
    plug(:dispatch)

    get "/:admin_id/users" do
      allUsers = Admin.get_users(admin_id)
      conn
      |> put_resp_content_type("application/json")
      |> send_resp(200, Jason.encode!(%{users: allUsers}))
    end

    post "/promote" do
      data = conn.params["data"]
      Logger.info("fsfa #{inspect(data)}")
      promote_user = Admin.promote_to_admin(data)
      conn
      |> put_resp_content_type("application/json")
      |> send_resp(200, Jason.encode!(promote_user))
    end
    post "/ban" do
      data = conn.params["data"]
      Logger.info("fsfa #{inspect(data)}")
      ban_user = Admin.ban_user(data)
      conn
      |> put_resp_content_type("application/json")
      |> send_resp(200, Jason.encode!(ban_user))
    end


  end
