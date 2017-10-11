#!/usr/bin/env bash
# ==============================================================================
# Dependencies =================================================================
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done

export PATH=$PATH:~/bin
export DEPLOY_ROOT_DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

source "$DEPLOY_ROOT_DIR/script/common.sh"
source "$DEPLOY_ROOT_DIR/script/ssl.sh"
source "$DEPLOY_ROOT_DIR/script/k8s.sh"
source "$DEPLOY_ROOT_DIR/script/master.sh"
source "$DEPLOY_ROOT_DIR/script/worker.sh"
source "$DEPLOY_ROOT_DIR/script/menu.sh"
source "$DEPLOY_ROOT_DIR/script/dependencies.sh"

# ==============================================================================
# Export ENV variables =========================================================
export $(cat .env | xargs)

# TODO: add if-else
export WORKER_FQDN=$HOSTNAME
# export ADVERTISE_IP=$(ip addr | grep 'state UP' -A2 | tail -n1 | awk '{print $2}' | cut -f1  -d'/')

# ==============================================================================
# Warning ======================================================================

show_menu
