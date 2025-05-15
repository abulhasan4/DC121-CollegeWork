# docker network

You can read the formatted version of this file
[on the GitLab project](https://gitlab.computing.dcu.ie/sblott/ca282-docker-demo).

A docker network is a virtual network to which docker containers can be attached.

Containers attached to the same docker network can communicate with each other
using their *container names* as *host names*.

This simplifies networking and communication between containers.

## Demo

Create a docker network:

```
$ make network
```

```
network:
	docker network create $(network)
```

Create two `alpine` containers (detached), both attached to the same docker network:

```
$ make run
```

```
run:
	docker run --detach --rm --name $(container_1) --network $(network) alpine:latest /sbin/init
	docker run --detach --rm --name $(container_2) --network $(network) alpine:latest /sbin/init
```

Note in particular that the containers have names.

Demonstrate that the containers can ping each other using their *container names* as *host names*:

```
$ make ping
```

```
ping:
	@echo
	@echo test ping from $(container_1) to $(container_2)...
	docker exec -it $(container_1) ping -c 1 $(container_2)
	@echo
	@echo test ping from $(container_2) to $(container_1)...
	docker exec -it $(container_2) ping -c 1 $(container_1)
```

Tidy up:

```
$ make stop
$ make remove
```
