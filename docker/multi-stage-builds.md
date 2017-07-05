# MULTI-STAGE BUILDS

```
FROM node:8.1.3 AS storefront

WORKDIR src
COPY ./ ./
RUN npm i && \
    npm build
    
FROM alpine

EXPOSE 80 443

WORKDIR /var/lib/nginx/tmp/client_body
COPY index.html index.html
COPY --from=storefront /src/dist ./

CMD ["nginx"]
```



