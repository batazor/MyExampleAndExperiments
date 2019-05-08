# gitlab-exporter

Prometheus exporter for GitLab

### Getting start

```
docker-compose up
```

### Export metrics

```
gitlab_issue_total{assigneeNickname="batazor",milestoune="Sprint 00"} 40
```

### ENV

| Name                      | Value                               |
|---------------------------|-------------------------------------|
| GITLAB_ENDPOINT           | https://gitlab.com                  |
| GITLAB_USER               | GITLAB_USER                         |
| GITLAB_PASSWORD           | GITLAB_PASSWORD                     |
| GITLAB_AUTH_TOKEN         | ""                                  |
| GITLAB_ISSUE_WEIGHT_REGEX | "([\\[])([0-9])*\\]"                |

### Format

##### Weight for issue

> `[40] Add new feature`  
> `[13] Fix bug #31`  
