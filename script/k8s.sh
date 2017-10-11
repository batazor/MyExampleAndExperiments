clean_k8s_conf() {
  print_green "Clear direcories"
  sudo /bin/rm -rf /etc/flannel
  sudo /bin/rm -rf /etc/kubernetes/*
  sudo /bin/rm -rf /etc/systemd/system/*
  sudo /bin/rm -rf /opt/cni/bin
  sudo /bin/rm -rf /srv/kubernetes/*

  print_green "Disable services"
  sudo systemctl daemon-reload
  sudo systemctl disable kubelet docker flanneld
  sudo systemctl stop kubelet docker flanneld
}

setting_kubectl() {
  CA_CERT="${HOME}/cert/ca.pem"
  ADMIN_KEY="${HOME}/cert/admin-key.pem"
  ADMIN_CERT="${HOME}/cert/admin.pem"

  print_green " - Setting kubectl"
  kubectl config set-cluster default-cluster \
    --certificate-authority=${CA_CERT} \
    --embed-certs=true \
    --server=https://${MASTER_HOST}:${APISERVER_PORT}

  kubectl config set-credentials default-admin \
    --client-certificate=${ADMIN_CERT} \
    --client-key=${ADMIN_KEY} \
    --certificate-authority=${CA_CERT} \
    --embed-certs=true

  kubectl config set-context default-system \
    --cluster=default-cluster \
    --user=default-admin

  kubectl config use-context default-system

  print_green " - Test kubectl. Get node"
  kubectl get node
}
