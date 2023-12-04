# simple-container-wizard
Web UI that allows quick stop and restart of docker containers

Work in progress

# Build and run locally
```docker build -t docker-web-interface .
docker run -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock -d docker-web-interface
```
# Run with docker compose
```yaml
version: "3.3"
services:
  simple-container-wizard:
    ports:
      - 3000:3000
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    image: ducky111/simple-container-wizard:latest
networks: {}
```
