# Multi Stage Build is a way to optimize Docker images by using multiple FROM statements in a single Dockerfile.
# The first stage is used to build the application, and the second stage is used to create a smaller image with only the necessary files.
# This is a simple example of a multi-stage build Dockerfile for a Node.js application.

# Stage 1: Build the application, dont forget to use alias image name
FROM golang:1.20-alpine AS builder
# Set the working directory
WORKDIR /app/
COPY main.go .

# Install dependencies
# RUN go mod init main

# RUN go mod tidy
# Build the application
RUN go build -o /app/main main.go

# Stage 2: Create a smaller image with only the necessary files
FROM alpine:3.18
# Set the working directory
WORKDIR /app/
# Copy the built application from the builder stage
COPY --from=builder /app/main .
ENV APP_PORT=8080
EXPOSE ${APP_PORT}
CMD /app/main