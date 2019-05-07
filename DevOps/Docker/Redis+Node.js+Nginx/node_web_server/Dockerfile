# Node.js
# VERSION   0.0.1

# Set the base image to Ubuntu
FROM node:4.9.1

# File Author / Mainteiner
MAINTAINER  Login Viktor <batazor111@gmail.com>

RUN         mkdir /src

WORKDIR     /src
ADD         app/ /src/
RUN         npm install

# ADD         app/nodemon.json /src/nodemon.json

# Expose port
EXPOSE      8080

# Run app
CMD         ["node", "index.js"]
