ssl_worker() {
  sudo mkdir -p /etc/kubernetes/ssl

  sudo cp ${HOME}/cert/ca.pem /etc/kubernetes/ssl/ca.pem
  sudo cp ${HOME}/cert/worker.pem /etc/kubernetes/ssl/worker.pem
  sudo cp ${HOME}/cert/worker-key.pem /etc/kubernetes/ssl/worker-key.pem

  sudo chmod 600 /etc/kubernetes/ssl/*-key.pem
  sudo chown root:root /etc/kubernetes/ssl/*-key.pem

  print_green "Move ssh cert" && ssl_worker
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
  sudo systemctl enable --now flanneld docker kubelet
}

add_worker() {
  yes_or_no "Generate new cert?" && new_ssl;
  yes_or_no "Generate new config?" && generate_config_worker;
  yes_or_no "Start worker?" && start_worker;
}
