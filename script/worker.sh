ssl() {
  sudo mkdir -p ${PATH_TO_K8S_CERT}

  sudo cp ./cert/ca.pem ${PATH_TO_K8S_CERT}/ca.pem

  print_green " - Generate the Kubernetes Worker Keypairs"
  sudo openssl genrsa -out ${PATH_TO_K8S_CERT}/${WORKER_FQDN}-worker-key.pem 2048
  sudo ADVERTISE_IP=${ADVERTISE_IP} openssl req -new -key ${PATH_TO_K8S_CERT}/${WORKER_FQDN}-worker-key.pem \
    -out ${PATH_TO_K8S_CERT}/${WORKER_FQDN}-worker.csr -subj "/CN=${WORKER_FQDN}" \
    -config ./conf/worker-openssl.cnf
  sudo ADVERTISE_IP=${ADVERTISE_IP} openssl x509 -req -in ${PATH_TO_K8S_CERT}/${WORKER_FQDN}-worker.csr \
    -CA ${PATH_TO_K8S_CERT}/ca.pem -CAkey ./cert/ca-key.pem -CAcreateserial -out ${PATH_TO_K8S_CERT}/${WORKER_FQDN}-worker.pem \
    -days 365 -extensions v3_req -extfile ./conf/worker-openssl.cnf

  sudo chmod 600 ${PATH_TO_K8S_CERT}/*-key.pem
  sudo chown root:root ${PATH_TO_K8S_CERT}/*-key.pem

  sudo ln -s ${PATH_TO_K8S_CERT}/${WORKER_FQDN}-worker.pem ${PATH_TO_K8S_CERT}/worker.pem
  sudo ln -s ${PATH_TO_K8S_CERT}/${WORKER_FQDN}-worker-key.pem ${PATH_TO_K8S_CERT}/worker-key.pem

  print_green "TLS Assets"
}


generate_config_worker() {
  print_green "Clear dist" && rm -rf dist

  for yaml in `find template/worker -type f | grep "\.template"`; do
    path=$(echo $yaml | sed -r 's/^template/dist/g')

    path=$(echo $path | sed -r 's/(\.template|master|worker)//g')
    path=$(echo $path | sed -r 's/dist\//dist/g')
    directory=$(echo $path | sed 's/\(.*\)\/.*/\1/')
    mkdir -p $directory
    eval "envsubst < ${yaml} > $path"
  done
}

start_worker() {
  print_green "Start..." && reinit
}

add_worker() {
  print_green "Move ssh cert" && ssl
  yes_or_no "Generate new config?" && generate_config_worker;
  yes_or_no "Start worker?" && start_worker;
}
