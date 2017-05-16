#!/bin/sh

helm package my-service
helm repo index ./ --url https://k8s-community.github.io/my-charts
