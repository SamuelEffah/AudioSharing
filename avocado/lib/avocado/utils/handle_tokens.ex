defmodule Avocado.Utils.HandleToken do
  require Logger
  alias Reed.Schema.User

  def verify_tokens(access_token!, refresh_token) do
    access_token! = access_token! || ""
    Logger.info("authenticating...")


    case Avocado.Utils.AccessToken.verify_and_validate(access_token!) do
      {:ok, claims} -> {:existing_claims, claims["user_id"]}
      {:error, error_reason} -> Logger.info("errror  #{inspect(error_reason)}")
        # verify_refresh_token(refresh_token)
    end


  end


  defp verify_refresh_token(refresh_token!) do
    refresh_token! = refresh_token! || ""
    case Avocado.Utils.RefreshToken.verify_and_validate!(refresh_token!) do
      {:ok, claims} ->
        user = Reed.Repo.get!(User, claims["user_id"])
        if user && is_nil(user.is_ban) do
          {:new_tokens, user.id, create_token(user.id), user}
        end
      _ -> nil
    end
  end

  defp create_token(user_id) do
    %{
      access_token: Avocado.Utils.AccessToken.generate_and_sign!(%{"user_id" => user_id}),
      refresh_token: Avocado.Utils.RefreshToken.generate_and_sign!(%{"user_id" => user_id})
    }
  end


end
