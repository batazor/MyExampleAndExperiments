# MySQL

Resolve all host

`GRANT ALL PRIVILEGES ON *.* TO 'userName'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;`

_Import dump_ `mysql -uuserName -p database -h 127.0.0.1 --port 3306 < dump.sql`  
_Export dump_ `mysqldump -uuserName -p database -h 127.0.0.1 --port 3306 > dump.sql`

### Run `phpmyadmin`

```bash
docker run -it \
  -p 8080:80 \
  -e PMA_HOST=127.0.0.1 \
  -e PMA_PORT=3306 \
  -e PMA_USER="userName" \
  -e PMA_PASSWORD="password" \
  phpmyadmin/phpmyadmin
```



