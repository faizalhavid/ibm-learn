docker container stop container-multi-stage-build;docker container rm container-multi-stage-build;docker rmi multi-stage-build:latest
docker build -t multi-stage-build:latest multi-stage-build;docker container create --name container-multi-stage-build -p 8080:8080 multi-stage-build:latest; docker container start container-multi-stage-build; docker container logs container-multi-stage-build;docker start container-multi-stage-build;docker container logs container-multi-stage-build;


# Docker Registry Image
#  Claim the personal Password from the Docker Hub

docker container stop container-multi-stage-build;docker container rm container-multi-stage-build;docker rmi multi-stage-build:latest
docker build -t nurhavid123/multi-stage-build:latest multi-stage-build;docker container create --name container-multi-stage-build -p 8080:8080 nurhavid123/multi-stage-build:latest; docker container start container-multi-stage-build; docker container logs container-multi-stage-build;docker start container-multi-stage-build;docker container logs container-multi-stage-build;
# To use the access token from your Docker CLI client:
# 1. Run

docker login -u nurhavid123

# 2. At the password prompt, enter the personal access token.
...

# 3. Push the image to your Docker Hub repository:
docker push nurhavid123/multi-stage-build