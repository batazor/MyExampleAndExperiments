new_ssl_cfssl() {

  print_green " - Generate the API Server Keypair"
  envsubst < conf/apiserver-csr.template.json > conf/apiserver-csr.json
  cfssl gencert \
    -ca=${HOME}/cert/ca.pem \
    -ca-key=${HOME}/cert/ca-key.pem \
    -config=conf/ca-config.json \
    -profile=kubernetes \
    conf/apiserver-csr.json | cfssljson -bare ${HOME}/cert/apiserver

  print_green " - Generate key for auth"
  openssl pkcs12 -inkey ${HOME}/cert/admin-key.pem -in ${HOME}/cert/admin.pem -export -out ${HOME}/cert/admin.pfx
}

# new_ssl_openssl() {
new_ssl() {
  rm -rf ${HOME}/cert

  print_green " - Create cert folder"
  mkdir -p ${HOME}/cert

  print_green " - Create a Cluster Root CA"
  cfssl gencert -initca conf/ca-csr.json | cfssljson -bare ${HOME}/cert/ca

  print_green " - Generate the Cluster Administrator Keypair"
  cfssl gencert \
    -ca=${HOME}/cert/ca.pem \
    -ca-key=${HOME}/cert/ca-key.pem \
    -config=conf/ca-config.json \
    -profile=kubernetes \
    conf/admin-csr.json | cfssljson -bare ${HOME}/cert/admin

  print_green " - Generate the kube-proxy Client Certificate"
  cfssl gencert \
    -ca=${HOME}/cert/ca.pem \
    -ca-key=${HOME}/cert/ca-key.pem \
    -config=conf/ca-config.json \
    -profile=kubernetes \
    conf/kube-proxy-csr.json | cfssljson -bare ${HOME}/cert/kube-proxy

  print_green " - Generate the Kubernetes API Server certificate and private key"
  cfssl gencert \
    -ca=${HOME}/cert/ca.pem \
    -ca-key=${HOME}/cert/ca-key.pem \
    -config=conf/ca-config.json \
    -hostname=${K8S_SERVICE_IP},${MASTER_HOST},127.0.0.1,kubernetes,kubernetes.default,kubernetes.default.svc,kubernetes.default.svc.cluster.local \
    -profile=kubernetes \
    conf/kubernetes-csr.json | cfssljson -bare ${HOME}/cert/apiserver

  # print_green " - Generate the API Server Keypair"
  # openssl genrsa -out ${HOME}/cert/apiserver-key.pem 2048
  # openssl req -new -key ${HOME}/cert/apiserver-key.pem -out ${HOME}/cert/apiserver.csr -subj "/CN=kube-apiserver" -config conf/openssl.cnf
  # openssl x509 -req -in ${HOME}/cert/apiserver.csr -CA ${HOME}/cert/ca.pem -CAkey ${HOME}/cert/ca-key.pem -CAcreateserial -out ${HOME}/cert/apiserver.pem -days 365 -extensions v3_req -extfile conf/openssl.cnf

  # print_green " - Generate key for auth"
  # openssl pkcs12 -inkey ${HOME}/cert/admin-key.pem -in ${HOME}/cert/admin.pem -export -out ${HOME}/cert/admin.pfx
}

ssl_worker() {
  sudo mkdir -p /etc/kubernetes/ssl

  sudo cp ${HOME}/cert/ca.pem /etc/kubernetes/ssl/ca.pem

  print_green " - Generate the Kubernetes Worker Keypairs"
  cfssl gencert \
    -ca=${HOME}/cert/ca.pem \
    -ca-key=${HOME}/cert/ca-key.pem \
    -config=conf/ca-config.json \
    -profile=kubernetes \
    conf/worker-csr.json | cfssljson -bare /etc/kubernetes/ssl/worker
  # sudo openssl genrsa -out /etc/kubernetes/ssl/${WORKER_FQDN}-worker-key.pem 2048
  # sudo ADVERTISE_IP=${ADVERTISE_IP} openssl req -new -key /etc/kubernetes/ssl/${WORKER_FQDN}-worker-key.pem \
  #   -out /etc/kubernetes/ssl/${WORKER_FQDN}-worker.csr -subj "/CN=${WORKER_FQDN}" \
  #   -config ./conf/worker-openssl.cnf
  # sudo ADVERTISE_IP=${ADVERTISE_IP} openssl x509 -req -in /etc/kubernetes/ssl/${WORKER_FQDN}-worker.csr \
  #   -CA /etc/kubernetes/ssl/ca.pem -CAkey ${HOME}/cert/ca-key.pem -CAcreateserial -out /etc/kubernetes/ssl/${WORKER_FQDN}-worker.pem \
  #   -days 365 -extensions v3_req -extfile ./conf/worker-openssl.cnf

  sudo chmod 600 /etc/kubernetes/ssl/*-key.pem
  sudo chown root:root /etc/kubernetes/ssl/*-key.pem

  # sudo ln -s /etc/kubernetes/ssl/${WORKER_FQDN}-worker.pem /etc/kubernetes/ssl/worker.pem
  # sudo ln -s /etc/kubernetes/ssl/${WORKER_FQDN}-worker-key.pem /etc/kubernetes/ssl/worker-key.pem

  print_green "TLS Assets"
}
