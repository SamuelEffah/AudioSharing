#!/bin/bash
set -e

docker build -t SamuelEffah/avocado .
docker save SamuelEffah/avocado| bzip2 | ssh podcast-api "bunzip2 | docker load"
ssh podcast-api "docker tag SamuelEffah/avocado podc/api:latest && podc tags:deploy api latest"