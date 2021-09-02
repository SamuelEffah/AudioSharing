defmodule AvocadoTest do
  use ExUnit.Case
  doctest Avocado

  test "greets the world" do
    assert Avocado.hello() == :world
  end
end
