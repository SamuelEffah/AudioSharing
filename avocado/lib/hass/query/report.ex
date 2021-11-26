defmodule Hass.Query.Report do
  import Ecto.Query, warn: false
  import Ecto.Changeset
  alias Hass.Repo

  alias Hass.Schema.Episode
  alias Hass.Schema.Podcast
  alias Hass.Schema.User
  alias Hass.Schema.Report
  alias Hass.Schema.Favorite

  require Logger


  def issue_report(data) do
    {_ ,pod_query} =
      from(
        p in Podcast,
        update: [
          inc: [num_of_reports: 1]
        ],
        where: p.id == ^data["podcast_id"],
        select: p
      )
      |> Repo.update_all([])

    if Enum.count(pod_query) == 1 do
      new_report = %Report{
        user_id: data["user_id"],
        podcast_id: data["podcast_id"],
        msg: data["msg"],
        is_resolve: false
      }
      Repo.insert(new_report)
    end
  end

end
