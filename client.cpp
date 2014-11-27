#include <cstdio>
#include <cstdlib>
#include <unistd.h>
#include <cstring>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

char message[] = "Hello world!\n";
char buf[sizeof(message)];

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

  sock = socket(AF_INET, SOCK_STREAM, 0);
  if (sock < 0) {
    perror("socket");
    exit(1);
  }

  addr.sin_family = AF_INET;
  addr.sin_port = port;
  if (connect(sock, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
    perror("connect");
    exit(2);
  }

  printf("Server run in %s:%d\n", ip_addr, addr.sin_port);

  send(sock, message, sizeof(message), 0);
  recv(sock, buf, sizeof(message), 0);

  printf("%s", buf);
  close(sock);

  return 0;
}
