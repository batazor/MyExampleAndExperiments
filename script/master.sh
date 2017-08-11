ssl() {
  sudo mkdir -p ${PATH_TO_K8S_CERT}

  sudo cp ./cert/ca.pem ${PATH_TO_K8S_CERT}/ca.pem
  sudo cp ./cert/apiserver.pem ${PATH_TO_K8S_CERT}/apiserver.pem
  sudo cp ./cert/apiserver-key.pem ${PATH_TO_K8S_CERT}/apiserver-key.pem

  sudo chmod 600 ${PATH_TO_K8S_CERT}/*-key.pem
  sudo chown root:root ${PATH_TO_K8S_CERT}/*-key.pem

  print_green "TLS Assets"
}

add_master() {
  print_green "Move ssh cert" && ssl
}
