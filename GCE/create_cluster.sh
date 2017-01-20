# Use the gcloud container clusters create command to create a Kubernetes clusters in the following zones:

# gce-europe-west1
gcloud container clusters create gce-europe-west1 \
  --zone=europe-west1-b \
  --num-nodes=5 \
  --scopes "cloud-platform,storage-ro,logging-write,monitoring-write,service-control,service-management,https://www.googleapis.com/auth/ndev.clouddns.readwrite"
