#!/usr/bin/env bash

echo "Building Docker Image (name = moonshot)."
docker build -t moonshot . &> /dev/null

if [ "$(docker info --format '{{ .Swarm.LocalNodeState }}')" == "inactive" ];then
  echo "Initialize swarm manager."
  docker swarm init  &> /dev/null
  echo "Swarm initialized."
fi

SWARM_MASTER_NODE_ADDR=$(docker info --format '{{ .Swarm.NodeAddr }}')

echo "Swarm manager is available at ${SWARM_MASTER_NODE_ADDR}."

echo "Deploying Services To Swarm Cluster"
docker stack deploy -c docker-stack.yml moonshot

echo "Adding 'localhost' to Whitelist (Redis)."
docker exec -it $(docker ps -qf "name=redis") redis-cli RPUSH whitelist localhost &> /dev/null
