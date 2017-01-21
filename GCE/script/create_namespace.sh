export GCP_PROJECT=$(gcloud config list --format='value(core.project)')

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  create -f ../k8s/addons/federation/federation-ns.yml
