#/bin/bash

export GCP_PROJECT=$(gcloud config list --format='value(core.project)')

# Federation Namespace =========================================================
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  create -f ../k8s/addons/federation/federation-ns.yml

# Provision Federated API Server ===============================================

# Create the Federated API Server Service
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  create -f ../k8s/addons/federation/apiserver/apiserver-svc.yml

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  get services

# TODO: check get EXTERNAL-IP
sleep 60

# Create the federation-apiserver-secrets
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  create secret generic federation-apiserver-secrets --from-file=../k8s/addons/federation/known-tokens.csv

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

# Provision Federated Controller Manager =======================================

# Create the Federated API Server Kubeconfig
FEDERATED_API_SERVER_ADDRESS=$(kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  get services federation-apiserver \
  -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

kubectl config set-cluster federation-cluster \
  --server=https://${FEDERATED_API_SERVER_ADDRESS} \
  --insecure-skip-tls-verify=true

FEDERATION_CLUSTER_TOKEN=$(cut -d"," -f1 ../k8s/addons/federation/known-tokens.csv)

kubectl config set-credentials federation-cluster \
  --token=${FEDERATION_CLUSTER_TOKEN}

kubectl config set-context federation-cluster \
  --cluster=federation-cluster \
  --user=federation-cluster

kubectl config use-context federation-cluster
kubectl  config view --flatten --minify > kubeconfigs/federation-apiserver/kubeconfig

# Create the Federated API Server Secret
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  create secret generic federation-apiserver-kubeconfig \
  --from-file=kubeconfigs/federation-apiserver/kubeconfig

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  describe secrets federation-apiserver-kubeconfig

# Deploy the Federated Controller Manager
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  create -f deployments/federation-controller-manager.yaml

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  get pods

# ------------------------------------------------------------------------------
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  create secret generic gce-asia-east1 \
  --from-file=kubeconfigs/gce-asia-east1/kubeconfig

kubectl --context=federation-cluster \
  create -f clusters/gce-asia-east1.yaml


# ------------------------------------------------------------------------------
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  create secret generic gce-europe-west1 \
  --from-file=kubeconfigs/gce-europe-west1/kubeconfig

kubectl --context=federation-cluster \
  create -f clusters/gce-europe-west1.yaml

# ------------------------------------------------------------------------------
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  create secret generic gce-us-central1 \
  --from-file=kubeconfigs/gce-us-central1/kubeconfig

kubectl --context=federation-cluster \
  create -f clusters/gce-us-central1.yaml

# ------------------------------------------------------------------------------
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  create secret generic gce-us-east1 \
  --from-file=kubeconfigs/gce-us-east1/kubeconfig

kubectl --context=federation-cluster \
  create -f clusters/gce-us-east1.yaml

kubectl --context=federation-cluster get clusters
