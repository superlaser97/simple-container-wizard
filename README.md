# simple-container-wizard
Web UI that allows quick stop and restart of docker containers

Work in progress

# Building
```
docker build -t docker-web-interface .
```

# Running
```
docker run -p 3000:3000 -v /var/run/docker.sock:/var/run/docker.sock -d docker-web-interface
```