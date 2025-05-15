FROM golang:1.20-alpine
ENV APP_PORT=8080
ENV APP_MODE=local

RUN mkdir app
COPY main.go app

EXPOSE ${APP_PORT}

CMD ["go", "run", "app/main.go"]   