ssl_worker() {
  sudo mkdir -p /etc/kubernetes/ssl

  sudo cp ${HOME}/cert/ca.pem /etc/kubernetes/ssl/ca.pem
  sudo cp ${HOME}/cert/worker-${HOSTNAME}.pem /etc/kubernetes/ssl/worker.pem
  sudo cp ${HOME}/cert/worker-${HOSTNAME}-key.pem /etc/kubernetes/ssl/worker-key.pem

  sudo chmod 600 /etc/kubernetes/ssl/*-key.pem
  sudo chown root:root /etc/kubernetes/ssl/*-key.pem

  print_green "TLS Assets"
}

generate_kubeconfig() {
  print_green " - generate kubeconfig"

  CA_CERT="${HOME}/cert/ca.pem"
  ADMIN_KEY="${HOME}/cert/admin-key.pem"
  ADMIN_CERT="${HOME}/cert/admin.pem"

  kubectl config set-cluster default-cluster \
    --certificate-authority=${CA_CERT} \
    --embed-certs \
    --server=https://${MASTER_HOST}:${APISERVER_PORT} \
    --kubeconfig=${HOSTNAME}.kubeconfig

  kubectl config set-credentials system:node \
    --client-certificate=${ADMIN_CERT} \
    --client-key=${ADMIN_KEY} \
    --embed-certs \
    --kubeconfig=${HOSTNAME}.kubeconfig

  kubectl config set-context default-cluster \
    --cluster=default-cluster \
    --user=system:node \
    --kubeconfig=${HOSTNAME}.kubeconfig

  sudo mkdir -p /etc/kubernetes/config
  kubectl config use-context default-cluster --kubeconfig=${HOSTNAME}.kubeconfig
  sudo cp ${HOSTNAME}.kubeconfig /etc/kubernetes/config/worker-kubeconfig.yaml
}

generate_config_worker() {
  print_green "Clear dist" && rm -rf dist

  for yaml in `find template/worker -type f | grep "\.template"`; do
    path=$(echo $yaml | sed -r 's/^template/dist/g')

    path=$(echo $path | sed -r 's/(\.template|master[!/]|worker[!/])//g')
    directory=$(echo $path | sed 's/\(.*\)\/.*/\1/')
    mkdir -p $directory
    eval "envsubst < ${yaml} > $path"
  done

  sudo cp -R dist/* /

  generate_kubeconfig
  generate_kube_proxy_config
}

start_worker() {
  print_green "Start..."

  sudo systemctl daemon-reload
  sudo systemctl enable --now flanneld docker kubelet
}

add_worker() {
  yes_or_no "Generate new cert?" && new_ssl_worker
  print_green "Move ssh cert" && ssl_worker
  yes_or_no "Generate new config?" && generate_config_worker
  yes_or_no "Start worker?" && start_worker
}
