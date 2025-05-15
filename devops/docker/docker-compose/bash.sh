# Docker Compose

# Create a docker-compose.yml file in the same directory as your Dockerfile with the following content:
# Create a container
docker-compose create

# Start the container
docker-compose start

# Stop the container
docker-compose stop

# Remove the container
docker-compose down

# Inspect the container
docker-compose ps

# List all docker-compose projects, name projects is name folder of docker-compose.yml
docker-compose ls

#  About Service in docker-compose.yml
#  Service is a container that is defined in the docker-compose.yml file. Each service can have its own configuration, including environment variables, ports, volumes, and more. Services can also depend on each other, allowing you to create complex applications with multiple containers that work together.
