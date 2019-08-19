#!/usr/bin/env bash



buildImage()
{
    echo "Building Docker Image (name = moonshot)."
    docker build -t moonshot . &> /dev/null
}

initSwarm()
{
    if [ "$(docker info --format '{{ .Swarm.LocalNodeState }}')" == "inactive" ];then
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
    echo "Adding 'localhost' to Whitelist (Redis)."
    docker exec -it $(docker ps -qf "name=redis") redis-cli RPUSH whitelist localhost &> /dev/null
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
