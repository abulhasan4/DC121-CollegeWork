# docker run

You can read the formatted version of this file
[on the GitLab project](https://gitlab.computing.dcu.ie/sblott/ca282-docker-demo).

The demo in this directory is the same as the one in the previous directory.

A `Dockerfile` allows a docker image to be defined in a configuration file; this allows
an image to be created in a reproducible way.  Sharing a `Dockerfile` with teammates is
effectively the same as sharing the image itself.

`docker compose` is a similar mechanism for container configuration (instead of image configuration).

`docker compose` allows a single configuration file which defines a group of related containers (services)
to be managed (built, started, stopped) in a reproducible way. As with a `Dockerfile`, sharing
a `docker compose` configuration file with teammates allows those teammates to reproduce a container configuration.

See the file `docker-compose.yml` in this directory:

```
services:
  web:
    build: .
    ports:
      - "8000:80"
  redis:
    image: "redis"
```

The format of this file is [YAML](https://yaml.org/) (*yet another markup language*).  In YAML, just like in
python, indentation defines the structure of the data.

The `docker-compose.yml` file defines the same two containers (services) as in the previous example: a nodejs/express-based
app and a redis server.

The name of the web server container (service) is `web`, and the name of the redis container (service) is
`redis`.

Take a look at the `Makefile` in this directory.  It is considerably simpler than those for
some of the other demos here.  That is because much (all?) of the configuration has moved to
the `docker compose` configuration file.

Run the service like this:

```
$ make start
```

```
start:
	docker compose up --detach

```

`docker compose` takes care of building images, creating networks, starting containers, and all of the
plumbing necessary to make this app work.

Test like this:

```
$ make get
```

And stop the service like this:

```
$ make stop
```

```
stop:
	docker compose stop
```
