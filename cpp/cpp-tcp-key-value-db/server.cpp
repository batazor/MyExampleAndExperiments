#include <cstdio>
#include <cstdlib>
#include <unistd.h>
#include <cstring>
#include <map>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <iostream>

int main(int argc, char *argv[]) {
  std::map <std::string,std::string> DB;  // Key-Value DB?
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

  char* query;
  char buf_tmp[1024];
  char query_type[4];
  char query_key[256];
  char query_value[1024] = "";
  while(1) {
    strcpy(query_type, "");
    strcpy(query_key, "");
    strcpy(query_value, "");
    sock = accept(listener, NULL, NULL);
    if (sock < 0) {
      perror("accept");
      exit(3);
    }

    bytes_read = recv(sock, buf, 1024, 0);

    strcpy(buf_tmp, buf);
    query = strtok(buf_tmp, " ");
    for (int i=0; query != NULL; ++i) {
      if (i == 0) {
        strcpy(query_type, query);
      } else if (i == 1) {
        strcpy(query_key, query);
      } else {
        strcat(query_value, query);
        strcat(query_value, " ");
      }
      query = strtok (NULL, " ");
    }

    if (strcmp(query_type, "set") == 0) {
      std::string query_set = "";
      // DB.insert ( std::make_pair(query_key, query_value) ); // Not updates values
      DB[query_key] = query_value; // Yes updates values
      query_set = std::string("Add new {")+query_key+std::string(":'")+query_value+std::string("'}");
      printf("> Add new {%s:'%s'}\n", query_key, query_value);
      strcpy(buf, query_set.c_str());
    } else if (strcmp(query_type, "get") == 0) {
      if(DB.find(std::string(query_key)) != DB.end()) {
        printf("> Key value {%s:'%s'}\n", DB.find(query_key)->first.c_str(), DB.find(query_key)->second.c_str());
        strcpy(query_value, DB.find(query_key)->second.c_str());
        strcpy(buf, query_value);
      } else {
        printf("> get: Not Keys\n");
        strcpy(buf, "Not Keys");
      }
    } else if (strcmp(query_type, "all") == 0) {
      strcpy(buf, "");
      printf("> SELECT ALL\n");
      int k=1;
      std::string query_all_tmp = "";
      for (std::map<std::string,std::string>::iterator it=DB.begin(); it!=DB.end(); ++it) {
        query_all_tmp = it->first + " => " + it->second + "\n> ";
        printf("> %d:\t %s => %s\n", k, it->first.c_str(), it->second.c_str());
        ++k;
        strcat(buf, query_all_tmp.c_str());
      }
    } else if (strcmp(query_type, "delete") == 0) {
      std::string query_delete = "";
      DB.erase (std::string(query_key));
      printf("> deleted {%s}", query_key);
      query_delete = std::string("deleted ") + query_key;
      strcpy(buf, query_delete.c_str());
    } else if (strcmp(query_type, "cleardb") == 0) {
      DB.clear();
      printf("> Removed all elements from the database");
      strcpy(buf, "Removed all elements from the database");
    } else {
      printf("> Error Query\n");
      strcpy(buf, "Error Query");
    }

    send(sock, buf, bytes_read, 0);
    close(sock);
  }

  return 0;
}
