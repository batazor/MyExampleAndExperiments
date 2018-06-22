FROM hseeberger/scala-sbt

EXPOSE 8558 2552

WORKDIR /src

COPY ./src ./src
COPY ./build.sbt ./build.sbt

RUN sbt compile

CMD ["sbt", "run"]
