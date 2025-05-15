# Redis (restart)

You can read the formatted version of this file
[on the GitLab project](https://gitlab.computing.dcu.ie/sblott/ca282-docker-demo).

This is the same as the previous `redis` demo, except now without the `--rm` option
to `docker run`:

```
$ make run
```

```
run:
	docker run --detach --name $(name) --publish 6379:6379 redis:latest
```

Recall that with the `--rm` option to `docker run`, docker removes a container when it stops.  This is often
the behaviour you want.

If we omit the `--rm` option, as here, then the resulting container can be stopped and restarted.

Importantly, when a stopped contained is restarted, it retains its previous disk state.

Try some combination of these commands:


```
$ make count        # do this several times

$ make stop         # stop the container (but it is not removed)
$ make count        # this now fails!

$ make restart      # restart *the same container*, with its existing disk state
$ make count        # do this several times, again
```

Observe that the counter is not reset to `0` when the container is restarted. `redis` stores its key-value
database on disk, docker preserves the disk, so redis reads its previous database when it restarts.

## docker container rm

Tidy up your container when you're done:

```
$ make remove
```

```
remove:
	-$(MAKE) stop
	docker container rm $(name)
```

The `docker container rm` command removes stopped containers.
