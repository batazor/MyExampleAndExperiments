#!/usr/bin/env bash
# ==============================================================================
# Dependencies =================================================================
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done

export DEPLOY_ROOT_DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

source "$DEPLOY_ROOT_DIR/script/common.sh"
source "$DEPLOY_ROOT_DIR/script/ssl.sh"
source "$DEPLOY_ROOT_DIR/script/k8s.sh"
source "$DEPLOY_ROOT_DIR/script/master.sh"
source "$DEPLOY_ROOT_DIR/script/worker.sh"

# ==============================================================================
# Export ENV variables =========================================================
export $(cat .env | xargs)

# TODO: add if-else
export WORKER_FQDN=$HOSTNAME
export ADVERTISE_IP=$(ip addr | grep 'state UP' -A2 | tail -n1 | awk '{print $2}' | cut -f1  -d'/')

# ==============================================================================
# Warning ======================================================================

yes_or_no "Show config?" && show_config;
yes_or_no "Generate new cert?" && new_ssl;
yes_or_no "Create a master?" && add_master;
yes_or_no "This a worket?" && add_worker;
