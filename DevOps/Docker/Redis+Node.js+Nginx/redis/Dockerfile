# Redis
# VERSION   0.0.1

# Set the base image to Ubuntu
FROM ubuntu:14.10

# File Author / Mainteiner
MAINTAINER  Login Viktor <batazor111@gmail.com>

# Update the repository and install Redis Server
RUN         apt-get update && apt-get install -y redis-server

# Expose Redis port 6379
EXPOSE      6379

# Run Redis Server
ENTRYPOINT ["/usr/bin/redis-server"]
