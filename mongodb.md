# MongoDB backup

[Backup database] (https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools/)
  + ```docker run -it -v ~/backup:/dump mongo:3.4 mongodump --host 127.0.0.1 --db data```
