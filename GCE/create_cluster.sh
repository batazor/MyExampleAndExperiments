#/bin/bash

# Use the gcloud container clusters create command to create a Kubernetes clusters in the following zones:

gcloud container clusters create gce-asia-east1 \
  --zone asia-east1-b \
  --machine-type "n1-highmem-2" \
  --image-type "GCI" \
  --disk-size "100" \
  --scopes "cloud-platform,storage-ro,logging-write,monitoring-write,service-control,service-management,https://www.googleapis.com/auth/ndev.clouddns.readwrite" \
  --enable-kubernetes-alpha \
  --num-nodes "3" \
  --network "default" \
  --enable-cloud-logging \
  --no-enable-cloud-monitoring \
  --enable-autoscaling \
  --min-nodes "3" \
  --max-nodes "4" \
  --async

gcloud container clusters create gce-europe-west1 \
  --zone europe-west1-b \
  --machine-type "n1-highmem-2" \
  --image-type "GCI" \
  --disk-size "100" \
  --scopes "cloud-platform,storage-ro,logging-write,monitoring-write,service-control,service-management,https://www.googleapis.com/auth/ndev.clouddns.readwrite" \
  --enable-kubernetes-alpha \
  --num-nodes "3" \
  --network "default" \
  --enable-cloud-logging \
  --no-enable-cloud-monitoring \
  --enable-autoscaling \
  --min-nodes "3" \
  --max-nodes "4" \
  --async

gcloud container clusters create gce-us-east1 \
  --zone=us-east1-b \
  --machine-type "n1-highmem-2" \
  --image-type "GCI" \
  --disk-size "100" \
  --scopes "cloud-platform,storage-ro,logging-write,monitoring-write,service-control,service-management,https://www.googleapis.com/auth/ndev.clouddns.readwrite" \
  --enable-kubernetes-alpha \
  --num-nodes "3" \
  --network "default" \
  --enable-cloud-logging \
  --no-enable-cloud-monitoring \
  --enable-autoscaling \
  --min-nodes "3" \
  --max-nodes "4" \
  --async

gcloud container clusters create gce-us-central1 \
  --zone=us-central1-b \
  --machine-type "n1-highmem-2" \
  --image-type "GCI" \
  --disk-size "100" \
  --scopes "cloud-platform,storage-ro,logging-write,monitoring-write,service-control,service-management,https://www.googleapis.com/auth/ndev.clouddns.readwrite" \
  --enable-kubernetes-alpha \
  --num-nodes "3" \
  --network "default" \
  --enable-cloud-logging \
  --no-enable-cloud-monitoring \
  --enable-autoscaling \
  --min-nodes "3" \
  --max-nodes "4" \
  --async

gcloud container clusters list
