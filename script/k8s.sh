clean_k8s_conf() {
  print_green "Clear direcories"
  sudo /bin/rm -rf /etc/flannel
  sudo /bin/rm -rf /etc/kubernetes/*
  sudo /bin/rm -rf /etc/systemd/system/*
  sudo /bin/rm -rf /opt/cni/bin
  sudo /bin/rm -rf /srv/kubernetes/*

  print_green "Disable services"
  sudo systemctl daemon-reload
  sudo systemctl disable kubelet docker flanneld etcd2
  sudo systemctl stop kubelet docker flanneld etcd2
  sudo systemctl start etcd2 flanneld
}
