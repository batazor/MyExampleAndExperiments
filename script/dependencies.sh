install_cfssl() {
  print_green "Install cfssl."
  mkdir -p ~/bin
  print_green "Download. Please wait..."
  curl -s -L -o ~/bin/cfssl https://pkg.cfssl.org/R1.2/cfssl_linux-amd64
  curl -s -L -o ~/bin/cfssljson https://pkg.cfssl.org/R1.2/cfssljson_linux-amd64
  chmod +x ~/bin/{cfssl,cfssljson}
  print_green "- success!"
}

install_kubectl() {
  print_green "Install kubectl."
  mkdir -p ~/bin
  print_green "- Download. Please wait..."
  curl -O https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_TAG}/bin/linux/amd64/kubectl
  mv kubectl ~/bin/kubectl
  chmod +x ~/bin/kubectl
  print_green "- success!"
}

preload_image() {
  print_green "Download ${KUBELET_IMAGE_URL}:${KUBELET_IMAGE_TAG}."
  rkt fetch ${KUBELET_IMAGE_URL}:${KUBELET_IMAGE_TAG}
  print_green "- success!"
}

install_dependencies() {
  echo;echo;echo;
  PS3="Please enter your choice: "
  options=("cfssl" "kubectl" "preload image" "Quit")
  select opt in "${options[@]}"
  do
      case $opt in
          "cfssl")
              install_cfssl
              ;;
          "kubectl")
              install_kubectl
              ;;
          "preload image")
              preload_image
              ;;
          "Quit")
              break
              ;;
          *) echo invalid option;;
      esac
  done
}
