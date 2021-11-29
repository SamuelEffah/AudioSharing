defmodule Avocado.MixProject do
  use Mix.Project

  def project do
    [
      app: :avocado,
      version: "0.1.0",
      elixir: "~> 1.11",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      test_coverage: [tool: ExCoveralls],
      preferred_cli_env: [
        coveralls: :test,
        "coveralls.html": :test
      ],
      elixirc_paths: elixirc_paths(Mix.env()),
      aliases: aliases()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger, :ueberauth_github, :ueberauth_google],
      mod: {Avocado.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [

      {:plug_cowboy, "~> 2.5"},
      {:phoenix_pubsub, "~> 2.0.0"},
      {:ecto_sql, "~> 3.0"},
      {:ecto_enum, "~> 1.4"},
      {:postgrex, ">= 0.0.0"},
      {:ueberauth, "~> 0.6"},
      {:ueberauth_github, "~> 0.7"},
      {:ueberauth_google, "~> 0.10"},
      {:oauther, "~> 1.1"},
      {:jason, "~> 1.2"},
      {:joken, "~> 2.0"},
      {:poison, "~> 3.1"},
      {:finch, "~> 0.6"},
      {:mime, "~> 2.0"},
      {:distillery, "~> 2.1"}
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"}
    ]
  end

  defp elixirc_paths(:test), do: ["lib", "test/_support"]
  defp elixirc_paths(_), do: ["lib"]

  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
