clean_k8s_conf() {
  print_green "Clear direcories"
  sudo /bin/rm -rf /etc/flannel
  sudo /bin/rm -rf /etc/kubernetes/*
  sudo /bin/rm -rf /etc/systemd/system/*
  sudo /bin/rm -rf /opt/cni/bin
  sudo /bin/rm -rf /srv/kubernetes/*

  print_green "Disable services"
  sudo systemctl daemon-reload
  sudo systemctl disable kubelet docker flanneld etcd2
  sudo systemctl stop kubelet docker flanneld etcd2
  sudo systemctl start etcd2 flanneld
}

install_kubectl() {
  CA_CERT="./cert/ca.pem"
  ADMIN_KEY="./cert/admin-key.pem"
  ADMIN_CERT="./cert/admin.pem"

  print_green " - Download kubectl"
  curl -o ~/bin/kubectl https://storage.googleapis.com/kubernetes-release/release/${K8S_VER}/bin/linux/amd64/kubectl
  chmod +x ~/bin/kubectl

  print_green " - Edit .bashrc"
  echo "export PATH=$PATH:~/bin" > ~/.bashrc

  print_green " - Setting kubectl"
  kubectl config set-cluster default-cluster --server=https://${MASTER_HOST}:${APISERVER_PORT} --certificate-authority=${CA_CERT}
  kubectl config set-credentials default-admin --certificate-authority=${CA_CERT} --client-key=${ADMIN_KEY} --client-certificate=${ADMIN_CERT}
  kubectl config set-context default-system --cluster=default-cluster --user=default-admin
  kubectl config use-context default-system

  print_green " - Test kubectl. Get node"
  kubectl get node
}
