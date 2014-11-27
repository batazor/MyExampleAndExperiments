#include <cstdio>
#include <cstdlib>
#include <unistd.h>
#include <cstring>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

int main(int argc, char *argv[]) {
  int port = 8080;
  char ip_addr[16] = "127.0.0.1";
  int sock, listener;
  struct sockaddr_in addr = {};
  char buf[1024];
  int bytes_read;

  listener = socket(AF_INET, SOCK_STREAM, 0);
  if (listener < 0) {
    perror("socket");
    exit(1);
  }

  if (argc == 3) {
    if (strcmp(argv[1], "-p") == 0)  { port = atoi(argv[2]); }

    if (strcmp(argv[1], "-ip") == 0) {
      if (inet_addr(argv[2]) != -1) {
        addr.sin_addr.s_addr = inet_addr(argv[2]);
        strcpy(ip_addr, argv[2]);
      }
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
    }
  }

  addr.sin_family = AF_INET;
  addr.sin_port = port;
  if (bind(listener, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
    perror("socket");
    exit(3);
  }

  printf("Server run in %s:%d\n", ip_addr, addr.sin_port);
  listen(listener, 1);

  while(1) {
    sock = accept(listener, NULL, NULL);
    if (sock < 0) {
      perror("accept");
      exit(3);
    }

    while(1) {
      bytes_read = recv(sock, buf, 1024, 0);
      if(bytes_read <= 0) break;
      send(sock, buf, bytes_read, 0);
    }

    close(sock);
  }

  return 0;
}
