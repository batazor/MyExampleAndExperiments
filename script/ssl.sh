new_ssl_cfssl() {
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

  print_green " - Generate the API Server Keypair"
  envsubst < conf/apiserver-csr.template.json > conf/apiserver-csr.json
  cfssl gencert \
    -ca=${HOME}/cert/ca.pem \
    -ca-key=${HOME}/cert/ca-key.pem \
    -config=conf/ca-config.json \
    -profile=kubernetes \
    conf/apiserver-csr.json | cfssljson -bare ${HOME}/cert/apiserver

  print_green " - Generate the kube-proxy Client Certificate"
  cfssl gencert \
    -ca=${HOME}/cert/ca.pem \
    -ca-key=${HOME}/cert/ca-key.pem \
    -config=conf/ca-config.json \
    -profile=kubernetes \
    conf/kube-proxy-csr.json | cfssljson -bare ${HOME}/cert/kube-proxy

  print_green " - Generate the kube-proxy Client Certificate"
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

new_ssl() {
  rm -rf ${HOME}/cert

  print_green " - Create cert folder"
  mkdir cert

  print_green " - Create a Cluster Root CA"
  openssl genrsa -out ${HOME}/cert/ca-key.pem 2048
  openssl req -x509 -new -nodes -key ${HOME}/cert/ca-key.pem -days 10000 -out ${HOME}/cert/ca.pem -subj "/CN=kube-ca"

  print_green " - Generate the API Server Keypair"
  openssl genrsa -out ${HOME}/cert/apiserver-key.pem 2048
  openssl req -new -key ${HOME}/cert/apiserver-key.pem -out ${HOME}/cert/apiserver.csr -subj "/CN=kube-apiserver" -config conf/openssl.cnf
  openssl x509 -req -in ${HOME}/cert/apiserver.csr -CA ${HOME}/cert/ca.pem -CAkey ${HOME}/cert/ca-key.pem -CAcreateserial -out ${HOME}/cert/apiserver.pem -days 365 -extensions v3_req -extfile conf/openssl.cnf

  print_green " - Generate the Cluster Administrator Keypair"
  openssl genrsa -out ${HOME}/cert/admin-key.pem 2048
  openssl req -new -key ${HOME}/cert/admin-key.pem -out ${HOME}/cert/admin.csr -subj "/CN=kube-admin"
  openssl x509 -req -in ${HOME}/cert/admin.csr -CA ${HOME}/cert/ca.pem -CAkey ${HOME}/cert/ca-key.pem -CAcreateserial -out ${HOME}/cert/admin.pem -days 365

  print_green " - Generate key for auth"
  openssl pkcs12 -inkey ${HOME}/cert/admin-key.pem -in ${HOME}/cert/admin.pem -export -out ${HOME}/cert/admin.pfx
}
