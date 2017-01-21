#/bin/bash

# Create cluster
./script/create_cluster.sh

# Create Cluster Secrets and Manifests
./script/create_secrets_and_manifest.sh

# Run kubernetes deferation
./script/create_kubernetes.sh
