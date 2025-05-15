# Redis

You can read the formatted version of this file
[on the GitLab project](https://gitlab.computing.dcu.ie/sblott/ca282-docker-demo).

Redis an
_open-source, in-memory data store used by millions of developers as a database, cache, streaming engine, and message broker_
([link](https://redis.io/)); it is widely-used as a fast key-value store.

Try:

```
$ make run
```

This runs a `redis` docker image, publishing TCP port `6379`, the default redis port.

Assuming that you have `redis-cli` installed (on debian, it's in the `redis-tools` package), then try this:

```
$ make count
```

```
count:
	redis-cli incr count
```

Run this several times.

It's a simple counter, but stored within redis running within your docker container.

## docker container stop

Try:

```
$ make stop
```

```
stop:
	docker container stop $(name)
```

This stops the container.

