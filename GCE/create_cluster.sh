# Use the gcloud container clusters create command to create a Kubernetes clusters in the following zones:

gcloud container clusters create gce-europe-west1 \
  --zone "europe-west1-b" \
  --machine-type "n1-standard-4" \
  --image-type "GCI" \
  --disk-size "100" \
  --local-ssd-count "1" \
  --scopes "cloud-platform,storage-ro,logging-write,monitoring-write,service-control,service-management,https://www.googleapis.com/auth/ndev.clouddns.readwrite" \
  --enable-kubernetes-alpha \
  --num-nodes "5" \
  --network "default" \
  --enable-cloud-logging \
  --no-enable-cloud-monitoring \
  --enable-autoscaling \
  --min-nodes "5" \
  --max-nodes "10"
