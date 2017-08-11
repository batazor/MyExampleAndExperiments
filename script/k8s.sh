reinit() {
  sudo systemctl daemon-reload
  sudo systemctl enable flanneld docker kubelet
  sudo systemctl restart flanneld docker kubelet
}
