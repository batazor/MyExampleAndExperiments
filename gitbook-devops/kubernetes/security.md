## Security
___

### Docker

#### docker-bench-security
* https://github.com/docker/docker-bench-security

```bash
docker run -it \
    --net host \
    --pid host \
    --cap-add audit_control \
    -v /var/lib:/var/lib \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /usr/lib/systemd:/usr/lib/systemd \
    -v /etc:/etc --label docker_bench_security \
    docker/docker-bench-security
```