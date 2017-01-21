#/bin/bash

# Federation Namespace
export GCP_PROJECT=$(gcloud config list --format='value(core.project)')

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  create -f ../k8s/addons/federation/federation-ns.yml

# Provision Federated API Server
export GCP_PROJECT=$(gcloud config list --format='value(core.project)')

# Create the Federated API Server Service
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  create -f ../k8s/addons/federation/apiserver/apiserver-svc.yml

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  get services

# Create the federation-apiserver-secrets
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  create secret generic federation-apiserver-secrets --from-file=known-tokens.csv

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  describe secrets federation-apiserver-secrets

# Create a Persistent Volume Claim
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  create -f ../k8s/addons/federation/apiserver/apiserver-etcd-pvc.yml

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  get pvc

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  get pv

# Create the Deployment
FEDERATED_API_SERVER_ADDRESS=$(kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  get services federation-apiserver \
  -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

sed -i "s|ADVERTISE_ADDRESS|${FEDERATED_API_SERVER_ADDRESS}|g" ../deployments/federation-apiserver.yaml

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  create -f ../deployments/federation-apiserver.yaml

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  get deployments

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  get pods
