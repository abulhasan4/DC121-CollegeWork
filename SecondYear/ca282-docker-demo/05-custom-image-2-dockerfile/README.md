# A custom image (2, Dockerfile)

You can read the formatted version of this file
[on the GitLab project](https://gitlab.computing.dcu.ie/sblott/ca282-docker-demo).


The normal way to build custom docker images is via a `Dockerfile`.

See the example in this directory:

```
FROM httpd:latest
COPY nobody.txt /usr/local/apache2/htdocs/
```

A `Dockerfile` is a sequence of directives for building a docker image.

Build the image like this:

```
$ make build
```

```
build:
	docker build . -t $(name)
```

The `.` indicates to use the `Dockerfile` in the current working directory, and
the `-t $(name)` is the name with which the resulting image will be tagged.

You can test the new image just like before, like this:

```
$ make run
$ make get
```

## Dockerfile

Common `Dockerfile` directives include:

- `FROM`: this is the base image, it is the starting point from which the new image will be built
- `COPY`: copy a local file into the image
- `RUN`: execute a command inside the image
- `WORKDIR`: change the working directory for subsequent directives
- `EXPOSE`: expose a network port
- `CMD`: the command to run when a container is created (can be overridden by command-line arguments)
- `ENTRYPOINT`: also the command to run when a container is created (can be extended, but not overridden, by
    command-line arguments)

The full `Dockerfile` reference is [https://docs.docker.com/engine/reference/builder/](here]).

## Tidy up

```
$ make stop
$ make remove
```
