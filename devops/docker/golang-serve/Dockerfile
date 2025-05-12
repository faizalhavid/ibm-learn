FROM golang:1.20-alpine
# Docker Environment Variables
# ENV <key>=<value> ...
ENV APP_PORT=8080
ENV APP_DATA=/logs

# RUN mkdir app
# WORKDIR INSTRUCTION
WORKDIR /app
RUN mkdir /app/${APP_DATA}
COPY main.go /app


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
CMD go run main.go




