#!/bin/sh

helm package myapp
helm repo index ./ --url https://k8s-community.github.io/mycharts
