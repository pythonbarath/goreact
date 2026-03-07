FROM golang:1.22-alpine AS builder

WORKDIR /src

COPY go.mod ./
COPY main.go ./

RUN CGO_ENABLED=0 GOOS=linux go build -o server .

FROM alpine:3.20

WORKDIR /app

COPY --from=builder /src/server ./server
COPY index.html ./index.html
COPY static ./static

EXPOSE 8080

CMD ["./server"]
