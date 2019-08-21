#!/usr/bin/env bash

buildImage()
{
    echo "Pulling Mongo Image."
    docker pull mongo:latest &> /dev/null
    echo "Mongo Image -- Done."

    echo "Pulling Redis Image."
    docker pull redis:latest &> /dev/null
    echo "Redis Image -- Done."

    echo "Building App Image (name = moonshot)."
    docker build -t moonshot . &> /dev/null
    echo "Moonshot Image -- Done."
}

initSwarm()
{
    if [[ "$(docker info --format '{{ .Swarm.LocalNodeState }}')" == "inactive" ]];then
      echo "Initialize swarm manager."
      docker swarm init  &> /dev/null
      echo "Swarm initialized."
    fi

    SWARM_MASTER_NODE_ADDR=$(docker info --format '{{ .Swarm.NodeAddr }}')

    echo "Swarm manager is available at ${SWARM_MASTER_NODE_ADDR}."
}

deployServices()
{
    echo "Deploying Services To Swarm Cluster"
    docker stack deploy -c docker-stack.yml moonshot
}

pushToRedisWhitelist()
{
    REDIS_CONTAINER=$(docker ps -qf "name=redis")
    while [[ -z "$REDIS_CONTAINER" ]]
    do
        echo "Redis Container down wait 5 seconds"
        sleep 5
        REDIS_CONTAINER=$(docker ps -qf "name=redis")
    done
    echo "Adding 'localhost' to Whitelist (Redis)."
    docker exec -it $REDIS_CONTAINER redis-cli RPUSH whitelist localhost
}

startServer()
{
    buildImage
    initSwarm
    deployServices
    pushToRedisWhitelist
}

stopServer()
{
    docker swarm leave --force
}

case $1 in
	start)
		echo "Starting Service!"
		startServer
		;;
	stop)
		echo "Killing Service!"
		stopServer
		;;
	*)
		echo "Please Run this script with arguments (start OR stop)"
		;;
  esac
