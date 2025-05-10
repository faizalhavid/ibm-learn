
# Docker Base Commands
# List all containers (default shows just running)
docker container ls

# List all containers (including stopped ones)
docker container ls -a

# Create a new container
docker container create --name <container_name> <image_name>:<image_tag>

# Start a container
docker container start <container_name>

# Stop a container
docker container stop <container_name>

# Restart a container
docker container restart <container_name>

# Remove a container
docker container rm <container_name>

# Remove all stopped containers
docker container prune

# Show container logs
docker container logs <container_name>
# Show logs in real-time
docker container logs -f <container_name>

# Execute a command inside a running container
docker container exec -it <container_name> <command>
docker container exec -i -t <container_name> /bin/bash

#  Set Container Port
docker create -p <host_port>:<container_port> <image_name>:<image_tag>
# example: docker create -p 8080:80 nginx:latest

# Run a container in detached mode (in the background)
docker run -d -p <host_port>:<container_port> <image_name>:<image_tag>

# Set Environment Variables
docker container create --name <container_name> -p <host_port>:<container_port> -e <env_var_name>=<env_var_value> <image_name>:<image_tag>
# example: docker container create --name mynginx -p 8080:80 -e MY_ENV_VAR=my_value nginx:latest
docker run -e <env_var_name>=<env_var_value> <image_name>:<image_tag>
docker container create --name docker-volume -p 27019:27017 --env MONGO_INITDB_ROOT_USERNAME=zal --env MONGO_INITDB_ROOT_PASSWORD=zal mongo:latest

# Show container stats
docker container stats

# Manage container memory, CPU, and disk usage
docker container create --name <container_name> --memory <memory_limit> --cpus <cpu_limit> <image_name>:<image_tag> 
# example: docker container create --name mynginx --memory 512m --cpus 1 nginx:latest

# Bind Mount a Host Directory
docker run -v <host_directory>:<container_directory> <image_name>:<image_tag>
# example: docker run -v /path/on/host:/path/in/container nginx:latest
docker container create --name docker-mounting --publish 27019:27017 --mount "type=bind,source=C:\Users\USER\OneDrive\Dokumen\GitHub\ibm-learn\devops\docker\mounting,destination=/data/db" --env MONGO_INITDB_ROOT_USERNAME=zal --env MONO_INITDB_ROOT_PASSWORD=zal mongo:latest 

# docker volumes
docker volume create mongo-data
docker container create --name docker-volume --publish 27018:27017 --mount "type=volume,source=mongo-data,destination=/data/db" --env MONGO_INITDB_ROOT_USERNAME=zal --env MONO_INITDB_ROOT_PASSWORD=zal mongo:latest 
docker volume create <volume_name>
# example: docker volume create my_volume
docker volume ls
docker volume inspect <volume_name>
# example: docker volume inspect my_volume
docker volume rm <volume_name>
# example: docker volume rm my_volume
docker volume prune
# example: docker volume prune
docker volume create --name <volume_name> --opt type=<type> --opt device=<device> --opt o=<options>


# Backup and Restore Docker Volumes
# Backup a volume
# Ensure the container is stopped
# Step 1
docker container stop <container_name>
docker container stop docker-volume
# Create a backup of the volume
docker container --name <container_name> --mount type=bind,source=<backup_directory>,target=/backup busybox tar cvf /backup/backup.tar /data/db
docker container create --name backup-container --mount "type=bind,source=C:\Users\USER\OneDrive\Dokumen\GitHub\ibm-learn\devops\docker\backup,destination=/backup" --mount "type=volume,source=mongo-data,destination=/data" mongo:latest
# execute the command inside the container\
docker container exec -it backup-container /bin/bash
docker container exec -it backup-container tar cvf /backup/backup.tar /data/db
# stop the backup container
docker container stop backup-container
# Remove the backup container
docker container rm backup-container

# Step 2
docker container run --rm --name <container_name> --mount "type=bind,source=<backup_directory>,target=/backup" --mount "type=volume,source=<volume_name>,target=/data" busybox tar xvf /backup/backup.tar -C /data
docker container run --rm --name docker-backup --mount "type=bind,source=C:\Users\USER\OneDrive\Dokumen\GitHub\ibm-learn\devops\docker\backup,destination=/backup" --mount "type=volume,source=mongo-data,destination=/data" mongo:latest tar cvf /backup/backup-2.tar /data


# Restore a volume
# Create a new container with the volume
docker container run --rm --name <container_name> --mount "type=volume,source=<volume_name>,target=/data" <image_name>:<image_tag> bash -c "cd /data && tar xvf /backup/backup.tar --strip 1"
docker container run --rm --name docker-restore --mount "type=bind,source=C:\Users\USER\OneDrive\Dokumen\GitHub\ibm-learn\devops\docker\backup,destination=/backup" --mount "type=volume,source=mongo-data,destination=/data" mongo:latest bash -c "cd /data && tar xvf /backup/backup-2.tar --strip 1"


# Docker Networks
docker network ls
# By default, Docker creates a bridge network named "bridge" for containers to communicate with each other.
# You can create custom networks using different drivers.
#  Create a custom bridge network
docker network create --driver <driver_name> <network_name>

# Remove a network
docker network rm <network_name>

# Networks with bridge driver
docker network create --driver bridge <network_name>
docker network create --driver bridge net_bridge

# Networks with host driver : Only for Linux
docker network create --driver host <network_name>
docker network create --driver host net_host
# Networks with overlay driver
docker network create --driver overlay <network_name>
docker network create --driver overlay net_overlay

# Comnunicate between containers
# We will simulate with creating two containers monggo-db and mongo-express
# Create a custom bridge network
docker network create --driver bridge mongonetwork
# Create a MongoDB container
docker container create --name mongodb --network mongonetwork --env MONGO_INITDB_ROOT_USERNAME=zal --env MONGO_INITDB_ROOT_PASSWORD=zal mongo:latest
# Create a Mongo Express container
docker container create --name mongodbexpress --network mongonetwork --publish 8081:8081 --env ME_CONFIG_MONGODB_URL="mongodb://zal:zal@mongodb:27017/" mongo-express:latest

docker container start mongodb

docker container start mongodbexpress


# Inspect a Container
docker container inspect <container_name>
# example: docker container inspect mynginx
# Inspect a Volume
docker volume inspect <volume_name>
# example: docker volume inspect my_volume
# Inspect a Network
docker network inspect <network_name>
# example: docker network inspect my_network


# prune
docker system prune
docker system prune -a
docker system prune --volumes
docker system prune --all
docker system prune --volumes --all
docker system prune --volumes --all --force
docker system prune --volumes --all --force --filter "until=24h"
docker container prune
docker image prune
docker volume prune
docker network prune
docker builder prune