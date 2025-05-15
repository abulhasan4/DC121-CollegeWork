# docker run --detach

You can read the formatted version of this file
[on the GitLab project](https://gitlab.computing.dcu.ie/sblott/ca282-docker-demo).

Review the `Makefile` in this directory.

Try:

```
$ make run
```

```
run:
	docker run --detach --rm --name $(name) --publish 8000:80 httpd:latest
```

The `docker run --detach` command launches a new *detached* container, it runs in the background.

Note that this is *not* an interactive container, so the `-it` options are omitted.

Try:

```
$ make ls
```

```
ls:
	docker container ls
```

You should see that your container is indeed running, and various details of its state.

## Entry point

Every docker container has an *entry point*.

The entry point is the program which runs when the container is launched (without any other entry point being
specified).  When that program exits, the container stops.

The image used here is `httpd`.  This is the
[official apache image](https://hub.docker.com/_/httpd)
from Docker Hub.

The entry point for this image, is `httpd`, which is the apache web server.

We can interact with that web server either
[via a browser](http://localhost:8000), or with utilities such a `wget`.

Try:

```
$ make get
```

```
get:
	wget -O - -q http://localhost:8000/
```

If you look back at the `docker run` command, above, you will see the option `--publish 8000:80`.

The apache web server listens for connections on port `80` within the container.  The `--publish` option
publishes that port as port `8000` on your local host.  Docker maps connections to port `8000` to port `80`
within the container.

## docker exec

We can execute commands within running containers.

Try:

```
$ make date
```

```
date:
	docker exec $(name) date
```

The `date` command executes inside the container.

Try:

```
$ make connect
```

```
connect:
	docker exec -it $(name) sh
```

Here, we run an interactive shell inside the container.

The `-it` options are required because the shell is an interactive, terminal command.

*Einstein* uses `docker exec` to execute student uploads within the _Einstein_ container.

## docker container stop

Stop your container when you're done:

```
$ make stop
```

```
stop:
	docker container stop $(name)
```

This stops the container.

