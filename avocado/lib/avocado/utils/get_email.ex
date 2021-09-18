defmodule Avocado.Utils.GetEmail do

  def get_email(emails) do
    primary_email = Enum.find(emails, fn e -> e["primary"] == true end)
    if(is_nil(primary_email),
      do: Enum.at(emails, 0)["email"],
      else: primary_email["email"]
    )
  end
end
