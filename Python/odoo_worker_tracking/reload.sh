#!/usr/bin/env bash
docker rm -f odoo db
docker-compose down
sudo rm -rf /data/odoo/

docker-compose up -d
