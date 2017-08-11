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
