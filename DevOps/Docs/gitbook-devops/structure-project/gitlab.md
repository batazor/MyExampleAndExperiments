# GitLab

### Backups by Cron

```bash
0 5 * * * docker exec -t gitlab gitlab-rake gitlab:backup:create
0 6 * * * docker exec -t gitlab /bin/sh -c 'umask 0077; tar cfz /var/opt/gitlab/backups/$(date "+etc-gitlab-\%s.tgz") -C /etc/gitlab'
```



