ssl_master() {
  sudo mkdir -p /etc/kubernetes/ssl

  sudo cp ./cert/ca.pem /etc/kubernetes/ssl/ca.pem
  sudo cp ./cert/apiserver.pem /etc/kubernetes/ssl/apiserver.pem
  sudo cp ./cert/apiserver-key.pem /etc/kubernetes/ssl/apiserver-key.pem

  sudo chmod 600 /etc/kubernetes/ssl/*-key.pem
  sudo chown root:root /etc/kubernetes/ssl/*-key.pem

  print_green "TLS Assets"
}

generate_config_master() {
  print_green "Clear dist" && rm -rf dist

  for yaml in `find template/master -type f | grep "\.template"`; do
    path=$(echo $yaml | sed -r 's/^template/dist/g')

    path=$(echo $path | sed -r 's/(\.template|master|worker)//g')
    path=$(echo $path | sed -r 's/dist\//dist/g')
    directory=$(echo $path | sed 's/\(.*\)\/.*/\1/')
    mkdir -p $directory
    eval "envsubst < ${yaml} > $path"
  done

  sudo cp -R dist/* /
}

start_master() {
  print_green "Start..."

  sudo systemctl daemon-reload

  sudo systemctl start etcd2

  print_green " - configure flanneld && etcd"
  curl -X PUT -d "value={\"Network\":\"$POD_NETWORK\",\"Backend\":{\"Type\":\"vxlan\"}}" "$ETCD_SERVER/v2/keys/coreos.com/network/config"

  sudo systemctl enable flanneld docker kubelet
  sudo systemctl restart flanneld docker kubelet

  cat << EOF
Basic Health Checks
$ curl http://127.0.0.1:8080/version
EOF
}

add_master() {
  print_green "Move ssh cert" && ssl_master
  yes_or_no "Generate new config?" && generate_config_master;
  yes_or_no "Start master?" && start_master;
}
