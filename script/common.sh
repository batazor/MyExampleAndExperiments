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
  cat << EOF
--------------------------------------------------------------------------------
Basic Health Checks

ADVERTISE_IP         ${ADVERTISE_IP}
APISERVER_PORT       ${APISERVER_PORT}
POD_NETWORK          ${POD_NETWORK}

MASTER_HOST          ${MASTER_HOST}
ETCD_ENDPOINTS       ${ETCD_ENDPOINTS}
K8S_VER              ${K8S_VER}
DNS_SERVICE_IP       ${DNS_SERVICE_IP}
NETWORK_PLUGIN       ${NETWORK_PLUGIN}
SERVICE_IP_RANGE     ${SERVICE_IP_RANGE}
WORKER_FQDN          ${WORKER_FQDN}
--------------------------------------------------------------------------------
EOF
}
