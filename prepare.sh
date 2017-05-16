#!/bin/sh

helm package my-service
mv *.tgz packages/
helm repo index packages --url https://k8s-community.github.com/my-charts
