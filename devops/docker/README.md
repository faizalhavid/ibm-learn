
# Virtual Machine
![Alt text](https://www.docker.com/app/uploads/2021/11/container-what-is-container-1080x935.png "Containerized Application")
A virtual machine (VM) is a software emulation of a physical computer. It runs an operating system and applications just like a physical machine but is hosted on a hypervisor or virtualization platform. VMs are isolated from each other and can run different operating systems on the same physical hardware.

# Docker

Docker is a platform that enables developers to automate the deployment of applications inside lightweight, portable containers. These containers can run on any machine that has Docker installed, ensuring consistency across different environments.

Docker uses a client-server architecture, where the Docker client communicates with the Docker daemon to manage containers. The Docker daemon is responsible for building, running, and managing containers. Docker images are the blueprints for containers, and they can be shared via Docker Hub or other registries.

Docker is widely used in DevOps for continuous integration and continuous deployment (CI/CD) pipelines, as it allows for easy scaling, isolation, and management of applications. It also simplifies the process of setting up development environments, making it easier for developers to collaborate and share their work.

## Architecture
![Alt text](https://docs.docker.com/get-started/images/docker-architecture.webp " Docker Architecture")
Docker's architecture consists of several key components:
- **Docker Daemon**: The background service that manages Docker containers and images.
- **Docker Client**: The command-line interface (CLI) that allows users to interact with the Docker daemon.
- **Docker Images**: Read-only templates used to create containers. They contain the application code and dependencies.
- **Docker Containers**: Instances of Docker images that run the application in an isolated environment.
- **Docker Registry**: A repository for storing and sharing Docker images. Docker Hub is the default public registry.
- **Docker Compose**: A tool for defining and running multi-container Docker applications using a YAML file.


## Docker Commands
- `docker run`: Run a container from an image.
- `docker ps`: List running containers.
- `docker images`: List available images.
- `docker pull`: Download an image from a registry.
- `docker push`: Upload an image to a registry.
- `docker build`: Build an image from a Dockerfile.
- `docker exec`: Execute a command in a running container.
- `docker stop`: Stop a running container.
- `docker rm`: Remove a stopped container.
- `docker rmi`: Remove an image.
- `docker-compose up`: Start services defined in a `docker-compose.yml` file.
- `docker-compose down`: Stop and remove services defined in a `docker-compose.yml` file.
- `docker network`: Manage Docker networks.
- `docker volume`: Manage Docker volumes.
- `docker logs`: View logs from a container.
- `docker inspect`: View detailed information about a container or image.
- `docker stats`: Display resource usage statistics for containers.
- `docker cp`: Copy files/folders between a container and the local filesystem.
- `docker commit`: Create a new image from a container's changes.
- `docker tag`: Tag an image with a new name or version.
- `docker login`: Log in to a Docker registry.
- `docker logout`: Log out from a Docker registry.
- `docker prune`: Remove unused data (containers, images, networks).
- `docker network create`: Create a new Docker network.
- `docker volume create`: Create a new Docker volume.
- `docker-compose logs`: View logs from all services defined in a `docker-compose.yml` file.
- `docker-compose exec`: Execute a command in a running service container.
- `docker-compose build`: Build images for services defined in a `docker-compose.yml` file.
- `docker-compose pull`: Pull images for services defined in a `docker-compose.yml` file.
- `docker-compose push`: Push images for services defined in a `docker-compose.yml` file.
- `docker-compose scale`: Scale services defined in a `docker-compose.yml` file.
- `docker-compose config`: Validate and view the configuration of a `docker-compose.yml` file.
- `docker-compose up -d`: Start services in detached mode (in the background).
- `docker-compose down --volumes`: Stop and remove services and their associated volumes.
- `docker-compose down --remove-orphans`: Stop and remove services and their associated orphan containers.
- `docker-compose restart`: Restart services defined in a `docker-compose.yml` file.
- `docker-compose ps`: List containers for services defined in a `docker-compose.yml` file.
- `docker-compose run`: Run a one-time command against a service defined in a `docker-compose.yml` file.
- `docker-compose stop`: Stop services defined in a `docker-compose.yml` file.
- `docker-compose start`: Start stopped services defined in a `docker-compose.yml` file.
- `docker-compose up --build`: Build images before starting services defined in a `docker-compose.yml` file.
- `docker-compose down --rmi all`: Stop and remove services and their associated images.
- `docker-compose down --remove-orphans`: Stop and remove services and their associated orphan containers.
- `docker-compose down --volumes`: Stop and remove services and their associated volumes.
- `docker-compose down --timeout <seconds>`: Stop and remove services with a specified timeout.
- `docker-compose down --no-deps`: Stop and remove services without stopping linked services.

### container
- `docker container ls`: List all containers (running and stopped).
- `docker container inspect <container_id>`: View detailed information about a specific container.
- `docker container logs <container_id>`: View logs from a specific container.
- `docker container stats <container_id>`: Display resource usage statistics for a specific container.
- `docker container prune`: Remove all stopped containers.
- `docker container start <container_id>`: Start a stopped container.
- `docker container stop <container_id>`: Stop a running container.
- `docker container restart <container_id>`: Restart a running container.
- `docker container rm <container_id>`: Remove a stopped container.
- `docker container exec -it <container_id> <command>`: Execute a command in a running container.
- `docker container cp <container_id>:<path> <local_path>`: Copy files/folders from a container to the local filesystem.
- `docker container cp <local_path> <container_id>:<path>`: Copy files/folders from the local filesystem to a container.
- `docker container commit <container_id> <new_image_name>`: Create a new image from a container's changes.
- `docker container tag <image_id> <new_image_name>`: Tag an image with a new name or version.
- `docker container network connect <network_name> <container_id>`: Connect a container to a network.
- `docker container network disconnect <network_name> <container_id>`: Disconnect a container from a network.
- `docker container update <container_id>`: Update the configuration of a running container.
- `docker container attach <container_id>`: Attach to a running container's console.
- `docker container pause <container_id>`: Pause a running container.
- `docker container unpause <container_id>`: Unpause a paused container.
- `docker container wait <container_id>`: Block until a container stops, then print its exit code.
- `docker container export <container_id> > <file_name>.tar`: Export a container's filesystem as a tar archive.
- `docker container import <file_name>.tar`: Import a tar archive as a new image.


