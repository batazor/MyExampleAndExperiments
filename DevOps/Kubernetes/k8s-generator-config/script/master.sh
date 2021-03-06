ssl_master() {
  sudo mkdir -p /etc/kubernetes/ssl

  sudo cp ${HOME}/cert/ca.pem /etc/kubernetes/ssl/ca.pem
  sudo cp ${HOME}/cert/ca-key.pem /etc/kubernetes/ssl/ca-key.pem
  sudo cp ${HOME}/cert/kubernetes.pem /etc/kubernetes/ssl/kubernetes.pem
  sudo cp ${HOME}/cert/kubernetes-key.pem /etc/kubernetes/ssl/kubernetes-key.pem

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

  generate_kube_proxy_config
}

start_master() {
  print_green "Start..."

  sudo systemctl daemon-reload
  sudo systemctl enable --now flanneld docker kubelet
  sudo systemctl restart flanneld docker kubelet
}

add_master() {
  yes_or_no "Generate new cert?" && new_ssl;
  print_green "Move ssh cert" && ssl_master
  yes_or_no "Generate new config?" && generate_config_master;
  yes_or_no "Start master?" && start_master;
  yes_or_no "Setting kubectl?" && setting_kubectl;
}
