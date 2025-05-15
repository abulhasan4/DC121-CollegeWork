# docker run

You can read the formatted version of this file
[on the GitLab project](https://gitlab.computing.dcu.ie/sblott/ca282-docker-demo).

This directory contains the standard nodejs/express "hello world" demo from
[here](https://expressjs.com/en/starter/hello-world.html), but wrapped in a docker container.

View the `Dockerfile`:

```
FROM node:latest           # use this image asthe starting point
RUN mkdir /app             # create a directory
WORKDIR /app               # subsequent directives are relative to the new directory
COPY app.js .              # copy the nodejs/express app into the container
RUN npm install express    # install the nodejs/npm prerequisites
CMD ["node", "app.js"]     # this is the entry point
EXPOSE 80                  # expose this port (only documentation)
```

The entire configuration for the docker image is in one small, static configuration
file.  This can easily bes shared with others (along with `app.js`), who can then build the *exact same image*.

(Note... really the `COPY app.js` directive should be last.  See note in `Dockerfile`.)

## Test

Build the image:

```
$ make build
```

Run the image (detached):

```
$ make run
```

Test the container:

```
$ make get
```

Tidy up:

```
$ make stop
$ make remove
```
