#/bin/bash

# Configuring kubeconfig =======================================================

# Get credentials for each Kubernetes cluster:
gcloud container clusters get-credentials gce-asia-east1 --zone=asia-east1-b
gcloud container clusters get-credentials gce-europe-west1 --zone=europe-west1-b
gcloud container clusters get-credentials gce-us-east1 --zone=us-east1-b
gcloud container clusters get-credentials gce-us-central1 --zone=us-central1-b

# List the contexts stored in your local kubeconfig:
for c in $(kubectl config view -o jsonpath='{.contexts[*].name}'); do echo $c; done

# Store the GCP Project Name
export GCP_PROJECT=$(gcloud config list --format='value(core.project)')

# Generate Cluster Configs =====================================================

# For each cluster create a kubeconfig file and
# update the corresponding cluster manifest:

kubectl config use-context "gke_${GCP_PROJECT}_asia-east1-b_gce-asia-east1"
ASIA_SERVER_ADDRESS=$(kubectl config view --minify -o jsonpath='{.clusters[0].cluster.server}')

cat > clusters/gce-asia-east1.yaml <<EOF
apiVersion: federation/v1beta1
kind: Cluster
metadata:
  name: gce-asia-east1
spec:
  serverAddressByClientCIDRs:
    - clientCIDR: "0.0.0.0/0"
      serverAddress: "${ASIA_SERVER_ADDRESS}"
  secretRef:
    name: gce-asia-east1
EOF

kubectl config view --flatten --minify > kubeconfigs/gce-asia-east1/kubeconfig

# ------------------------------------------------------------------------------

kubectl config use-context "gke_${GCP_PROJECT}_europe-west1-b_gce-europe-west1"
EUROPE_SERVER_ADDRESS=$(kubectl config view --minify -o jsonpath='{.clusters[0].cluster.server}')

cat > clusters/gce-europe-west1.yaml <<EOF
apiVersion: federation/v1beta1
kind: Cluster
metadata:
  name: gce-europe-west1
spec:
  serverAddressByClientCIDRs:
    - clientCIDR: "0.0.0.0/0"
      serverAddress: "${EUROPE_SERVER_ADDRESS}"
  secretRef:
    name: gce-europe-west1
EOF

kubectl config view --flatten --minify > kubeconfigs/gce-europe-west1/kubeconfig

# ------------------------------------------------------------------------------

kubectl config use-context "gke_${GCP_PROJECT}_us-central1-b_gce-us-central1"
US_CENTRAL_SERVER_ADDRESS=$(kubectl config view --minify -o jsonpath='{.clusters[0].cluster.server}')

cat > clusters/gce-us-central1.yaml <<EOF
apiVersion: federation/v1beta1
kind: Cluster
metadata:
  name: gce-us-central1
spec:
  serverAddressByClientCIDRs:
    - clientCIDR: "0.0.0.0/0"
      serverAddress: "${US_CENTRAL_SERVER_ADDRESS}"
  secretRef:
    name: gce-us-central1
EOF

kubectl config view --flatten --minify > kubeconfigs/gce-us-central1/kubeconfig

# ------------------------------------------------------------------------------

kubectl config use-context "gke_${GCP_PROJECT}_us-east1-b_gce-us-east1"
US_EAST_SERVER_ADDRESS=$(kubectl config view --minify -o jsonpath='{.clusters[0].cluster.server}')

cat > clusters/gce-us-east1.yaml <<EOF
apiVersion: federation/v1beta1
kind: Cluster
metadata:
  name: gce-us-east1
spec:
  serverAddressByClientCIDRs:
    - clientCIDR: "0.0.0.0/0"
      serverAddress: "${US_EAST_SERVER_ADDRESS}"
  secretRef:
    name: gce-us-east1
EOF

kubectl config view --flatten --minify > kubeconfigs/gce-us-east1/kubeconfig
