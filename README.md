# DevOps
Simple example DevOps

## Architecture

![Architecture](./docs/DevOps.png)

## Docker RUN

```bash
# Run Redis container
docker run -d --name redis -p 6379:6379 redis

# Node build Image and create container
docker build -t batazor/node .
docker run -d --name node -p 8080 --link redis:redis batazor/node
```
