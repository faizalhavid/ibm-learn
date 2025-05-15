# Docker Compose

# Create a docker-compose.yml file in the same directory as your Dockerfile with the following content:
# Create a container
docker-compose create

# Start the container
docker-compose start

# Stop the container
docker-compose stop

# Delete the docker compose container
docker-compose rm

# Remove the container
docker-compose down

# Inspect the container
docker-compose ps

# List all docker-compose projects, name projects is name folder of docker-compose.yml
docker-compose ls

#  About Service in docker-compose.yml
#  Service is a container that is defined in the docker-compose.yml file. Each service can have its own configuration, including environment variables, ports, volumes, and more. Services can also depend on each other, allowing you to create complex applications with multiple containers that work together.


# Docker Compose Down
#  The docker-compose down command is used to stop and remove all containers defined in a docker-compose.yml file. It also removes any networks created by the docker-compose up command. This command is useful for cleaning up your environment and freeing up resources.
docker-compose down

# Docker Compose Event
#  The docker-compose events command is used to listen for events from the Docker daemon. This command can be useful for monitoring the state of your containers and services. You can use this command to see when containers are started, stopped, or restarted, as well as when images are pulled or built.
docker events
docker events --filter 'container=container_name' 
# This command will only show events related to the specified container.