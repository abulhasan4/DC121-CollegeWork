# docker run

You can read the formatted version of this file
[on the GitLab project](https://gitlab.computing.dcu.ie/sblott/ca282-docker-demo).

View the `Dockerfile` in this directory.
Observe that it builds a nodejs/express-based image with an app called `app.js`.

View `app.js` in this directory.  This is an express HTTP server.

The only endpoint is `/`, and that endpoint calls a function to increment a counter
stored in a redis server on a host called `redis`

The architecture looks like this:

```
web client   ------->    nodejs/express app (a docker container)
             <-------           ^    |
                                |    |
                                |    |
                                |    v
			 redis counter (another docker container)
```

The two docker containers are attached to the same network, and the
app uses the host name `redis` to contact the redis container.

## Instructions

Build the image:

```
$ make build
```

Create the docker network:

```
$ make network
```

Start the redis container:

```
$ make redis
```

Start the app container:

```
$ make app
```

Test (do this several times):

```
$ make get
```

(Or just visit [http://localhost:8000](http://localhost:8000).)

Tidy up:

```
$ make stop
$ make remove
```
