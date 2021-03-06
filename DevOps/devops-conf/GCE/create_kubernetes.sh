#/bin/bash

export GCP_PROJECT=$(gcloud config list --format='value(core.project)')

# Federation Namespace =========================================================
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  create -f ../k8s/addons/federation/federation-ns.yml

# Provision Federated API Server ===============================================

# Create the Federated API Server Service
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  create -f ../k8s/addons/federation/apiserver/apiserver-svc.yml

# TODO: check get EXTERNAL-IP
sleep 150

# Wait until the `EXTERNAL-IP` is populated as it will be required to configure
# the federation-controller-manager.
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  get services

# ------------------------------------------------------------------------------

# Create the federation-apiserver-secrets
kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  create secret generic federation-apiserver-secrets --from-file=known-tokens.csv

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  describe secrets federation-apiserver-secrets

# Federation API Server Deployment =============================================
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

sed -i "s|ADVERTISE_ADDRESS|${FEDERATED_API_SERVER_ADDRESS}|g" deployments/federation-apiserver.yaml

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  create -f deployments/federation-apiserver.yaml

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  get deployments

# TODO: it's bad
sleep 120

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  get pods

# Provision Federated Controller Manager =======================================

# Create the Federated API Server Kubeconfig
kubectl config set-cluster federation-cluster \
  --server=https://${FEDERATED_API_SERVER_ADDRESS} \
  --insecure-skip-tls-verify=true

FEDERATION_CLUSTER_TOKEN=$(cut -d"," -f1 known-tokens.csv)

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
# FEDERATION_DNS=$(gcloud dns managed-zones list --filter federation | awk '{print $2}' | grep -v DNS_NAME)
# sed -i "s|federation.com.|$FEDERATION_DNS|g" deployments/federation-controller-manager.yaml

kubectl --context="gke_${GCP_PROJECT}_us-central1-b_gce-us-central1" \
  --namespace=federation \
  create -f ../k8s/addons/federation/controller-manager-deploy.yaml

# TODO: it's bad
sleep 60

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
