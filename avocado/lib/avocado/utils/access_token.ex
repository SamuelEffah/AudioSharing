defmodule Avocado.Utils.AccessToken do

  use Joken.Config

  def token_config, do: default_claims(default_exp: 60 * 60 * 24) #TODO: change to 60 * 60
end
