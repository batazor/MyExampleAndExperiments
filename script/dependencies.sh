install_cfssl() {
  print_green "Install cfssl."
  mkdir -p ~/bin
  print_green "Download. Please wait..."
  curl -s -L -o ~/bin/cfssl https://pkg.cfssl.org/R1.2/cfssl_linux-amd64
  curl -s -L -o ~/bin/cfssljson https://pkg.cfssl.org/R1.2/cfssljson_linux-amd64
  chmod +x ~/bin/{cfssl,cfssljson}
  export PATH=$PATH:~/bin
  print_green "Success!"
}

install_dependencies() {
  echo;echo;echo;
  PS3="Please enter your choice: "
  options=("cfssl" "Quit")
  select opt in "${options[@]}"
  do
      case $opt in
          "cfssl")
              install_cfssl
              ;;
          "Quit")
              break
              ;;
          *) echo invalid option;;
      esac
  done
}
