# Build the release
# -----------------

FROM hexpm/elixir:1.11.3-erlang-23.2.7-alpine-3.13.2 AS build
ENV MIX_ENV=prod
ENV PORT 8080
ENV HOST 0.0.0.0
WORKDIR /source
RUN apk update && \
    apk upgrade --no-cache && \
    apk add --no-cache \
    git \
    build-base \
    nodejs-current \
    nodejs-npm \ 
    python3 && \ 
    mix local.rebar --force && \
    mix local.hex --force
# Install and compile dependencies
COPY mix.exs mix.lock ./
COPY config config
RUN mix do deps.get, deps.compile

# Compile and build the app
COPY . .
RUN mix do compile, release


# Run the app
# -----------

FROM elixir:1.9.0-alpine
ENV MIX_ENV=prod


WORKDIR /app
COPY --from=build /source/_build/${MIX_ENV}/rel/avocado .

CMD ["bin/avocado", "start"]