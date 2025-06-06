docker container stop container-golang-server;docker container rm container-golang-server;docker rmi golang-server:latest
docker build -t golang-server:latest golang-serve;docker image inspect golang-server:latest; docker container create --name container-golang-server --publish 8080:8080 golang-server:latest; docker container start container-golang-server; docker container logs container-golang-server;docker start container-golang-server;docker container logs container-golang-server;

# replace env variable
docker container stop container-golang-server;docker container rm container-golang-server;docker rmi golang-server:latest
docker build -t golang-server:latest golang-serve;docker image inspect golang-server:latest; docker container create --name container-golang-server --publish 8081:8081 --env APP_PORT=8081 golang-server:latest; docker container start container-golang-server; docker container logs container-golang-server;docker start container-golang-server;docker container logs container-golang-server;

# command for arg instuction
docker container stop container-golang-server;docker container rm container-golang-server;docker rmi golang-server:latest
docker build -t golang-server:latest golang-serve --build-arg app=test ;docker image inspect golang-server:latest; docker container create --name container-golang-server --publish 8081:8081 golang-server:latest; docker container start container-golang-server; docker container logs container-golang-server;docker start container-golang-server;docker container logs container-golang-server;