#!/usr/bin/env bash

SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done

export DEPLOY_ROOT_DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

source "$DEPLOY_ROOT_DIR/script/common.sh"

# ==============================================================================
# Generate config ==============================================================
print_green "Generate config"
for yaml in `find . -type f | grep "\.template"`; do
  path=$(echo $yaml | sed -r 's/\/template\//dist\//g')
  path=$(echo $path | sed -r 's/\.template//g')
  path=$(echo $path | sed 's/\.//')
  directory=$(echo $path | sed 's/\(.*\)\/.*/\1/')
  mkdir -p $directory
  eval "envsubst < ${yaml} > $path"
done
