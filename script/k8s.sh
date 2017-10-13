clean_k8s_conf() {
  print_green "- clear direcories"
  sudo /bin/rm -rf /etc/flannel
  sudo /bin/rm -rf /etc/kubernetes/*
  sudo /bin/rm -rf /etc/systemd/system/*
  sudo /bin/rm -rf /opt/cni/bin
  sudo /bin/rm -rf /srv/kubernetes/*

  print_green "- disable services"
  sudo systemctl daemon-reload
  sudo systemctl disable kubelet docker flanneld
  sudo systemctl stop kubelet docker flanneld
}

generate_kube_proxy_config() {
  CA_CERT="${HOME}/cert/ca.pem"
  KUBE_PROXY_KEY="${HOME}/cert/kube-proxy-key.pem"
  KUBE_PROXY_CERT="${HOME}/cert/kube-proxy.pem"

  print_green " - setting kube-proxy config"

  kubectl config set-cluster default-cluster \
  --certificate-authority=$CA_CERT \
  --embed-certs \
  --server=https://${MASTER_HOST}:${APISERVER_PORT} \
  --kubeconfig=kube-proxy.kubeconfig

  kubectl config set-credentials kube-proxy \
    --client-certificate=$KUBE_PROXY_CERT \
    --client-key=$KUBE_PROXY_KEY \
    --embed-certs \
    --kubeconfig=kube-proxy.kubeconfig

  kubectl config set-context default \
    --cluster=default-cluster \
    --user=kube-proxy \
    --kubeconfig=kube-proxy.kubeconfig

  kubectl config use-context default --kubeconfig=kube-proxy.kubeconfig

  sudo mkdir -p /etc/kubernetes/config
  sudo cp kube-proxy.kubeconfig /etc/kubernetes/config/kube-proxy.kubeconfig
}

setting_kubectl() {
  CA_CERT="${HOME}/cert/ca.pem"
  ADMIN_KEY="${HOME}/cert/admin-key.pem"
  ADMIN_CERT="${HOME}/cert/admin.pem"

  print_green " - setting kubectl"
  kubectl config set-cluster default-cluster \
    --certificate-authority=${CA_CERT} \
    --embed-certs \
    --server=https://${MASTER_HOST}:${APISERVER_PORT}

  kubectl config set-credentials admin \
    --client-certificate=${ADMIN_CERT} \
    --client-key=${ADMIN_KEY}

  kubectl config set-context default-cluster \
    --cluster=default-cluster \
    --user=admin

  kubectl config use-context default-cluster

  print_green " - test kubectl. Get node list:"
  kubectl get node
}
