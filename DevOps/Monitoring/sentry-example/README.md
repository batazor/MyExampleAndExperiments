## This example work with sentry and difference clients

### Setup

```
docker-compose up -d postgres redis
// Save as `SENTRY_SECRET_KEY` into '.env' file
// As example: `ed+upn^ie&+uin=z*804=*#dqcd8z#)i&b(b!k%(@uhd35hlk(`
docker run --rm sentry:8.17.0 config generate-secret-key
docker run -it --rm \
  -e SENTRY_SECRET_KEY='ed+upn^ie&+uin=z*804=*#dqcd8z#)i&b(b!k%(@uhd35hlk(' \
  -e SENTRY_REDIS_HOST=redis \
  -e SENTRY_POSTGRES_HOST=postgres \
  -e SENTRY_DB_USER=sentry \
  -e SENTRY_DB_PASSWORD=sentry \
  --link sentryexample_postgres_1:postgres \
  --link sentryexample_redis_1:redis \
  --net sentryexample_default \
  sentry:8.17.0 sentry upgrade
```

### Getting start

```
docker-compose up
```

### Demo app

`demo-app` - demo application. Work in 3000 port. Send error message in sentry.
