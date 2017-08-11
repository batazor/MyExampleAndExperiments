print_green() {
  printf '%b' "\033[92m$1\033[0m\n"
}

yes_or_no() {
  while true; do
    read -p "$* [y/n]: " yn
    case $yn in
      [Yy]*) return 0  ;;
      [Nn]*) echo "Aborted" ; return  1 ;;
      * ) echo "Please answer yes or no.";;
    esac
  done
}

show_config() {
  yes_or_no "ADVERTISE_IP"         ${ADVERTISE_IP}         || exit 1
  yes_or_no "APISERVER_PORT"       ${APISERVER_PORT}       || exit 1

  yes_or_no "MASTER_HOST"          ${MASTER_HOST}          || exit 1
  yes_or_no "ETCD_ENDPOINTS"       ${ETCD_ENDPOINTS}       || exit 1
  yes_or_no "K8S_VER"              ${K8S_VER}              || exit 1
  yes_or_no "DNS_SERVICE_IP"       ${DNS_SERVICE_IP}       || exit 1
  yes_or_no "NETWORK_PLUGIN"       ${NETWORK_PLUGIN}       || exit 1
  yes_or_no "SERVICE_IP_RANGE"     ${SERVICE_IP_RANGE}     || exit 1
  yes_or_no "WORKER_FQDN"          ${WORKER_FQDN}          || exit 1

  yes_or_no "PATH_TO_K8S_CERT"     ${PATH_TO_K8S_CERT}     || exit 1
  yes_or_no "PATH_TO_K8S_MANIFEST" ${PATH_TO_K8S_MANIFEST} || exit 1
}
