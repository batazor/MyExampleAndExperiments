ssl_worker() {
  sudo mkdir -p /etc/kubernetes/ssl

  sudo cp ./cert/ca.pem /etc/kubernetes/ssl/ca.pem

  print_green " - Generate the Kubernetes Worker Keypairs"
  sudo openssl genrsa -out /etc/kubernetes/ssl/${WORKER_FQDN}-worker-key.pem 2048
  sudo ADVERTISE_IP=${ADVERTISE_IP} openssl req -new -key /etc/kubernetes/ssl/${WORKER_FQDN}-worker-key.pem \
    -out /etc/kubernetes/ssl/${WORKER_FQDN}-worker.csr -subj "/CN=${WORKER_FQDN}" \
    -config ./conf/worker-openssl.cnf
  sudo ADVERTISE_IP=${ADVERTISE_IP} openssl x509 -req -in /etc/kubernetes/ssl/${WORKER_FQDN}-worker.csr \
    -CA /etc/kubernetes/ssl/ca.pem -CAkey ./cert/ca-key.pem -CAcreateserial -out /etc/kubernetes/ssl/${WORKER_FQDN}-worker.pem \
    -days 365 -extensions v3_req -extfile ./conf/worker-openssl.cnf

  sudo chmod 600 /etc/kubernetes/ssl/*-key.pem
  sudo chown root:root /etc/kubernetes/ssl/*-key.pem

  sudo ln -s /etc/kubernetes/ssl/${WORKER_FQDN}-worker.pem /etc/kubernetes/ssl/worker.pem
  sudo ln -s /etc/kubernetes/ssl/${WORKER_FQDN}-worker-key.pem /etc/kubernetes/ssl/worker-key.pem

  print_green "TLS Assets"
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
}

start_worker() {
  print_green "Start..."

  sudo systemctl daemon-reload
  sudo systemctl enable flanneld docker kubelet
  sudo systemctl restart flanneld docker kubelet
}

add_worker() {
  print_green "Move ssh cert" && ssl_worker
  yes_or_no "Generate new config?" && generate_config_worker;
  yes_or_no "Start worker?" && start_worker;
}
