# A custom image (1, manual)

You can read the formatted version of this file
[on the GitLab project](https://gitlab.computing.dcu.ie/sblott/ca282-docker-demo).


The normal approach for building custom docker images is do use a
`Dockerfile` (see the next tutorial step, `../5-custom-image-2-dockerfile`).

However, it is also possible to build a custom image by manually or interactively
configuring a container to meet your needs, and then committing (taken a snapshot of) your changes.

Try:

```
$ make build
```

```
build:
	-$(MAKE) stop
	docker run --detach --rm --name $(name) httpd:latest
	docker cp ./nobody.txt $(name):$(directory)
	docker commit $(name) $(name)
	$(MAKE) stop
```

1. Stop the container if it is running.
2. Run an `httpd` container (detached).
3. Copy a file into the container.
4. Commit (snapshot) the current container named `$(name)`.
5. Stop the container.

Usually, this would be done interactively (not with a script like this).

Perhaps confusingly, we are using the same name for the container and for the image.  The namespace for images
is different from the namespace for containers, so the names don't clash.

## docker images ls

Next, try:

```
$ make ls
```

```
ls:
	docker image ls
```

```
REPOSITORY                      TAG            IMAGE ID       CREATED         SIZE
04-custom-image-1-manual        latest         0fde890917ca   3 minutes ago   145MB
```

This time, we're listing the images available on the local system.

You should see your newly-created image.

## Test

Try:

```
$ make run
$ make get
```

```
get:
	wget -O - -q http://localhost:8000/
	wget -O - -q http://localhost:8000/nobody.txt
```

```
wget -O - -q http://localhost:8000/
<html><body><h1>It works!</h1></body></html>
wget -O - -q http://localhost:8000/nobody.txt
Nobody expects the Spanish Inquisition!
```

We're fetching the file from the server which we copied previously.

Note: this is a different container running a different image.
It's a container running a customised version of the `httpd` image containing apache (as before),
plus the file (`nobody.txt`) which we copied into the original container.

## docker container stop

Tidy up:

```
$ make stop
$ make remove
```

```
stop:
	docker container stop $(name)

remove:
        docker image rm $(name)
```

This stops the container and removes the image.

