defmodule Gwen.Cors do
  import Plug.Conn

  def init(_) do
  end

  @spec call(Plug.Conn.t(), any) :: Plug.Conn.t()
  def call(conn, _opts) do
  conn
  |> put_resp_header("Access-Control-Allow-Origin", "*")
  |> put_resp_header("Access-Control-Allow-Method", "POST, GET, OPTIONS")
  |> put_resp_header("Access-Control-Max-Age", "86400")
  end
end
