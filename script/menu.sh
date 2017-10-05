show_menu() {
  echo;echo;echo;
  PS3="Please enter your choice: "
  options=("Show config" "Install dependencies" "Delete config" "Create a master" "Create a worket" "Quit")
  select opt in "${options[@]}"
  do
      case $opt in
          "Show config")
              show_config
              ;;
          "Install dependencies")
              install_dependencies
              ;;
          "Delete config")
              clean_k8s_conf
              ;;
          "Create a master")
              add_master
              ;;
          "Create a worket")
              add_worker
              ;;
          "Quit")
              break
              ;;
          *) echo invalid option;;
      esac
  done
}
