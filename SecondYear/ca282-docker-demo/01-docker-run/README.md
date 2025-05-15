# docker run

You can read the formatted version of this file
[on the GitLab project](https://gitlab.computing.dcu.ie/sblott/ca282-docker-demo).

Review the `Makefile` in this directory.

Try:

```
$ make run
```

```
run:
	docker run -it --rm --name $(name) alpine:latest
```

The `name` variable expands to `01-docker-run` (read the `Makefile` for full details).

The `docker run` command launches a new container.

This demo uses the `alpine:latest` image.  This is
*a minimal Docker image based on Alpine Linux with a complete package index and only 5 MB in size*
([alpine on docker hub](https://hub.docker.com/_/alpine)).

The options used are:

- `-it`: this is short for `-i` (interactive mode) and `-t` (assign a pseudo TTY, or a terminal)
- `--rm`: when the container exits, remove it
- `--name $(name)`: assign a name to the new container, this name can be used for interacting with the
  container via other docker commands; here, the `name` variable expands to is `01-docker-run`, so this is the
  container's name
- `alpine:latest`: this is the docker image (from [docker hub](https://hub.docker.com/)) based upon which the
    container is created.

## Interactive

If you want your container to interact with standard input, then you should use the `-i` option.

If you additionally want to run terminal programs (e.g. an interactive shell or a terminal text editor like `nano` or
`vim`), then you should additionally use the `-t` option.

A common case is to use both: `-it` (or neither).

## Remove on exit

Containers can be started, stopped, and then restarted again.  When a container stops, the default is that the
container continues to exist (in case you want to restart it).

The `--rm` option changes this behaviour such that the container is removed as soon as it stops.

List all running docker containers:

```
$ docker container ls
```

List all running and stopped docker containers:

```
$ docker container ls -a
```

Tip for your `.bashrc`:

```
alias dc="docker container"
```

## Container names

Every docker container is assigned a container ID:

```
$ docker container ls
CONTAINER ID IMAGE         COMMAND   CREATED        STATUS        PORTS   NAMES
ca859f8b2d36 alpine:latest "/bin/sh" 5 seconds ago  Up 4 seconds          01-docker-run
```

In this case, the container ID is `ca859f8b2d36`.

It can be helpful in addition to assign a meaningful, human-readable container a name.
The container's name in this example is `01-docker-run`.

Usually, you can manage containers using either their name or their ID (but for normal humans, the name
can be more convenient).  If you do not assign your container a name, then docker will assign a random
name for you.  For example:

```
CONTAINER ID IMAGE         COMMAND   CREATED        STATUS        PORTS   NAMES
1ed041106d31 alpine:latest "/bin/sh" 8 seconds ago  Up 7 seconds          nice_robinson
```

## Images

This example uses the `alpine` image, specifically the latest version of the `alpine` image.

A docker image is
*a read-only template that contains a set of instructions for creating a container that can
run on the docker platform* ([source](https://jfrog.com/knowledge-base/a-beginners-guide-to-understanding-and-building-docker-images/)).

You can think of an image as being like an operating-system image on a USB stick from which one or many operating-system
installations can be created.

## Docker hub

[Docker hub](https://hub.docker.com/) is a web site from which freely available docker images can be
downloaded.
