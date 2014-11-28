#include <cstdio>
#include <cstdlib>
#include <iostream>
#include <unistd.h>
#include <cstring>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

int main(int argc, char *argv[]) {
  int port = 8080;
  char ip_addr[16] = "127.0.0.1";
  int sock;
  struct sockaddr_in addr = {};

  if (argc == 3) {
  if (strcmp(argv[1], "-p") == 0)  { port = atoi(argv[2]); }

    if (strcmp(argv[1], "-ip") == 0) {
      if (inet_addr(argv[2]) != -1) {
        addr.sin_addr.s_addr = inet_addr(argv[2]);
        strcpy(ip_addr, argv[2]);
      }
    } else {
      addr.sin_addr.s_addr = inet_addr("127.0.0.1");
    }
  } else if (argc == 5) {
    if (strcmp(argv[1], "-p") == 0)  { port = atoi(argv[2]); }
    if (strcmp(argv[3], "-p") == 0)  { port = atoi(argv[4]); }

    if (strcmp(argv[1], "-ip") == 0) {
      if (inet_addr(argv[2]) != -1) {
        addr.sin_addr.s_addr = inet_addr(argv[2]);
        strcpy(ip_addr, argv[2]);
      }
    } else if (strcmp(argv[3], "-ip") == 0) {
      if (inet_addr(argv[4]) != -1) {
        addr.sin_addr.s_addr = inet_addr(argv[4]);
        strcpy(ip_addr, argv[4]);
      }
    } else {
      addr.sin_addr.s_addr = inet_addr("127.0.0.1");
    }
  } else {
    addr.sin_addr.s_addr = inet_addr("127.0.0.1");
  }

  addr.sin_family = AF_INET;
  addr.sin_port = port;

  char query[1024];
  char buf[1024];
  while(1) {
    sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) {
      perror("socket");
      exit(1);
    }

    if (connect(sock, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
      perror("connect");
      exit(2);
    }

    std::cout << "> ";
    std::cin.getline(query, 1024);
    if (strcmp(query, "exit") == 0) {
      std::cout << std::endl << "Goodbye." << std::endl;
      return 0;
    }
    if (strlen(query) < 5 && strcmp(query, "all")) {
      std::cout << "> Error Query" << std::endl;
      continue;
    }

    send(sock, query, sizeof(query), 0);
    recv(sock, buf, 1024, 0);

    std::cout << "> " << buf << std::endl;
    close(sock);
  }

  return 0;
}
