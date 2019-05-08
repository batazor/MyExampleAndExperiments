FROM node:4.4

WORKDIR /src

ADD ./ ./

RUN npm i
RUN echo "PORT=4000" > .env
RUN npm build

EXPOSE 4000

CMD npm run start
