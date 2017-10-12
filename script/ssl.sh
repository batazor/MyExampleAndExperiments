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
    conf/kubernetes-csr.json | cfssljson -bare ${HOME}/cert/kubernetes

  print_green " - Generate key for auth"
  openssl pkcs12 -inkey ${HOME}/cert/admin-key.pem -in ${HOME}/cert/admin.pem -export -out ${HOME}/cert/admin.pfx
}

new_ssl_worker() {
  rm -rf ${HOME}/cert

  print_green " - Create cert folder"
  mkdir -p ${HOME}/cert

  print_green " - Generate the Kubernetes Worker Keypairs"
  cfssl gencert \
    -ca=${HOME}/cert/ca.pem \
    -ca-key=${HOME}/cert/ca-key.pem \
    -config=conf/ca-config.json \
    -hostname=${ADVERTISE_IP},${MASTER_HOST},${K8S_SERVICE_IP} \
    -profile=kubernetes \
    conf/worker-csr.json | cfssljson -bare ${HOME}/cert/worker-${HOSTNAME}

  print_green "TLS Assets"
}
