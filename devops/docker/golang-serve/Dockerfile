FROM golang:1.20-alpine
# Docker Environment Variables
# ENV <key>=<value> ...
ENV APP_PORT=8080
ENV APP_DATA=/logs

# RUN mkdir app
# WORKDIR INSTRUCTION
WORKDIR /app
RUN mkdir /app/${APP_DATA}/
COPY main.go /app/


# Docker Expose
# By use of the EXPOSE instruction, you can document which ports are intended to be published.
# EXPOSE <port> [<port>/<protocol>...]
EXPOSE ${APP_PORT}

# Volume Instructions
# VOLUME ["/data"]
# VOLUME ["/data", "/data2"]
VOLUME ${APP_DATA}

#  WORKDIR Instruction
#  This instruction sets the working directory inside the container.
#  WORKDIR /path/to/workdir


# Before use Workdir, we dont need use path app/main.go again 
# CMD go run app/main.go
# After use Workdir


# USER INSTRUCTION
# USER <user>[:<group>]
# RUN addgroup -S employee
# RUN adduser -S -D -h /app employee-1 employee
# RUN chown -R employee-1:employee /app
# USER employee-1

# ARGUMENT INSTRUCTION
# Argument is a variable that users can pass at build-time to the Dockerfile with the docker build command using the --build-arg <varname>=<value> flag.
# This is different from the ENV instruction, which defines environment variables that are available to the running container.
# ARG <name>[=<default value>]
# ARG app=main
#  cause ARG process when build image so we need pass the value in ENV
# ENV app=${app}
# RUN mkdir app
# COPY main.go app
# RUN mv app/main.go app/${app}.go
# CMD ["go", "run", "app/${app}.go"]

# Healthcheck Instruction
# HEALTHCHECK [OPTIONS] CMD command
RUN apk --no-cache add curl
HEALTHCHECK --interval=5s  --start-period=5s CMD curl -f http://localhost:${APP_PORT}/health || exit 1

# ENtRYPOINT Instruction
# ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT ["go", "run"]

CMD ["main.go"]

