new_ssl() {
  pwd

  print_green " - Create cert folder"
  mkdir cert

  print_green " - Create a Cluster Root CA"
  openssl genrsa -out ./cert/ca-key.pem 2048
  openssl req -x509 -new -nodes -key ./cert/ca-key.pem -days 10000 -out ./cert/ca.pem -subj "/CN=kube-ca"

  print_green " - Generate the API Server Keypair"
  openssl genrsa -out ./cert/apiserver-key.pem 2048
  openssl req -new -key ./cert/apiserver-key.pem -out ./cert/apiserver.csr -subj "/CN=kube-apiserver" -config conf/openssl.cnf
  openssl x509 -req -in ./cert/apiserver.csr -CA ./cert/ca.pem -CAkey ./cert/ca-key.pem -CAcreateserial -out ./cert/apiserver.pem -days 365 -extensions v3_req -extfile conf/openssl.cnf

  print_green " - Generate the Cluster Administrator Keypair"
  openssl genrsa -out ./cert/admin-key.pem 2048
  openssl req -new -key ./cert/admin-key.pem -out ./cert/admin.csr -subj "/CN=kube-admin"
  openssl x509 -req -in ./cert/admin.csr -CA ./cert/ca.pem -CAkey ./cert/ca-key.pem -CAcreateserial -out ./cert/admin.pem -days 365

  print_green " - Generate key for auth"
  openssl pkcs12 -inkey ./cert/admin-key.pem -in ./cert/admin.pem -export -out ./cert/admin.pfx
}
