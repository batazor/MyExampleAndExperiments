# Simple TCP-clinet and Key-Value DB

## Start
Server start

    cd ~/cpp-tcp-key-value-db
    ./build/server.out

Client start

    cd ~/cpp-tcp-key-value-db
    ./build/client.out

### Parametrs

#### -p [port]
Sets the port  
Default: 8080

#### -ip [ip-address]
ip-address takes
Default: 127.0.0.1

## Key-Value DB

### set key value

    > set key value
    > Add new {key:'value'}

### get key

    > get key
    > value

### all

    > all
    > key1 => value1
    > key2 => value2
    > keyN => valueN

### delete

    > delete key
    > deleted {key}

### clear

    > cleardb
    > Removed all elements from the database

### exit

    > exit
    > Goodbye.

### Bad Request

    > run bag help
    > Error Query
