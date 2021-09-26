defmodule Avocado.Utils.Auth do
  require Logger
  alias Avocado.Utils.AccessToken
  alias Avocado.Utils.RefreshToken
  alias Avocado.UserSession
  alias Hass.Query.User, as: UserQuery

  def authenticate(access_token, refresh_token) do
    case check_tokens(access_token, refresh_token) do
      {:ok, user_id} ->
        user_in_session = UserSession.lookup(user_id)

        if Enum.count(user_in_session) != 0 do
          Logger.info("user existed in session #{inspect(user_in_session)}")
          user_cached = UserSession.get_all(user_id)

          {:ok, user_cached}
        else
          user = UserQuery.get_user_by_id(user_id)


          if user do
            UserSession.start_supervised(
              user_id: user.id,
              fullname: user.fullname,
              username: user.username,
              profile_url: user.profile_url,
              current_activity: user.current_activity
            )

            {:ok, user}
          end

          Logger.info("user do not exit in session #{inspect(user_in_session)}")
        end

      {:error, msg} ->
        Logger.info("failed authentication #{inspect(msg)}")
        {:error, msg}

      {:new_tokens, tokens} ->
        Logger.info("new tokens #{inspect(tokens)}")
        {:new_tokens, tokens}
    end
  end

  defp check_tokens(access_token!, refresh_token!) do
    with {:ok, claims} <- AccessToken.verify_and_validate(access_token!),
         {:ok, _} <- RefreshToken.verify_and_validate(refresh_token!) do
      Logger.info("user id from claims #{inspect(claims)}")
      {:ok, claims["id"]}
    else
      {:error, reason} ->
        Logger.info("login reason failed #{inspect(reason)}")
        {:error, "Something went wrong"}
    end
  end
end
