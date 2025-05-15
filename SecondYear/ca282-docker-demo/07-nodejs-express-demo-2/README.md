# Volumes

You can read the formatted version of this file
[on the GitLab project](https://gitlab.computing.dcu.ie/sblott/ca282-docker-demo).

This image is the same as `../06-nodejs-express-demo-1` except:

- the `nodemon` module is added to `Dockerfile`, and
- the default command is now `nodemon node app.js`.

`nodemon` is a node/npm module which runs an app, and *restarts it* whenever
the source files change.  This is helpful for interactive development and debugging.

`flask` for python has a similar development mode.

The `docker run` command is now:

```
docker run ... --volume $(PWD):/app ...
```

This mounts a docker volume (a storage area) inside the container which is
backed by the current working directory.

The current working directory is now also the working directory inside the container.

Changes to `app.js` are immediately live within the container.

This is a more typical development set up.  It avoids repeatedly having to building new images to test changes.

Run the container and edit `app.js`.  Observe that changes take immediate effect.

Tidy up is as before.
