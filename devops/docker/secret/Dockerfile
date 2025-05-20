# Begin a named stage from your toolchain image of choice to build the binary,
# in this case the stage is called "build".
FROM registry.access.redhat.com/ubi8/go-toolset:latest AS build

# Copy only your source from the build context into the build. Be careful with
# files in your project directory that contain secrets. Does your
# .gitignore file have lines which should be in your .dockerignore file?
COPY go.mod go.sum *.go .

# In a single RUN step, mount your secrets, perform the build and then clean
# up any files your secret/s were written to, if any.
# If your toolchain image uses a non-root user then put the user ID after each
# mount argument as seen here.
RUN --mount=type=secret,id=GITHUB_TOKEN,uid=1001 \
    --mount=type=secret,id=ARTIFACTORY_USER,uid=1001 \
    --mount=type=secret,id=ARTIFACTORY_TOKEN,uid=1001 \
    # Give Go credentials to download modules from Github Enterprise
    git config --global url."https://$(cat /run/secrets/GITHUB_TOKEN)@github.<work-domain>.com".insteadOf "https://github.<work-domain>.com" && \
    # Give Go credentials to use Artifactory as a Go module proxy
    GOPROXY="https://$(cat /run/secrets/ARTIFACTORY_USER):$(cat /run/secrets/ARTIFACTORY_TOKEN)@na.artifactory.swg-devops.com/artifactory/api/go/my-repo" \
    # ...and bypass the proxy for Github Enterprise
    GOPRIVATE="github.<work-domain>.com" \
    # ...and build the Go program
    go build -o secrets-training . && \
    # Then delete the .gitconfig file created by `git config` because it
    # contains a secret
    rm ~/.gitconfig

# If you need to perform more RUN steps using the same secrets, then --mount the
# secret for each RUN step and delete files containg the secrets, if any, in the
# same RUN step.

# Begin a new stage for the image you will ship using your base image of choice,
# or better yet; FROM scratch.
FROM registry.access.redhat.com/ubi8-minimal:latest

# Don't forget to set your compliance owner label
LABEL "compliance.owner"="my-team"

# Copy only what is needed to run from the previously named stage/s, in this
# case we copy the Go binary from the stage called "build".
COPY --from=build /opt/app-root/src/secrets-training /

# Set your entrypoint, in this case the Go binary
ENTRYPOINT ["/secrets-training"]