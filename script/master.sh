ssl() {
  sudo mkdir -p ${PATH_TO_K8S_CERT}

  sudo cp ./cert/ca.pem ${PATH_TO_K8S_CERT}/ca.pem
  sudo cp ./cert/apiserver.pem ${PATH_TO_K8S_CERT}/apiserver.pem
  sudo cp ./cert/apiserver-key.pem ${PATH_TO_K8S_CERT}/apiserver-key.pem

  sudo chmod 600 ${PATH_TO_K8S_CERT}/*-key.pem
  sudo chown root:root ${PATH_TO_K8S_CERT}/*-key.pem

  print_green "TLS Assets"
}

generate_config_master() {
  for yaml in `find . -type f | grep "\.template"`; do
    path=$(echo $yaml | sed -r 's/\/template\//dist\//g')
    path=$(echo $path | sed -r 's/(\.template|master|worker)//g')
    path=$(echo $path | sed -r 's/dist\//dist/g')
    path=$(echo $path | sed 's/\.//')
    directory=$(echo $path | sed 's/\(.*\)\/.*/\1/')
    mkdir -p $directory
    eval "envsubst < ${yaml} > $path"
  done
}

add_master() {
  print_green "Move ssh cert" && ssl
  yes_or_no "Generate new config?" && generate_config_master;
}
