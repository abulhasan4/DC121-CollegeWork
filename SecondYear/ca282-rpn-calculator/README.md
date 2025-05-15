Fork and clone this repo.

When you are done, push your work back to the `master` branch in your project on GitLab.

### Node modules

This is a node project.  It depends upon a number of node modules.

To install the necessary node modules, use:

    $ npm install

`npm` is the *node package manager*.  This creates a directory `node_modules` containing all of the node
modules which are required for this project.

The `make` targets in this directory try to ensure that `npm install` has been run, but it's probably best not
to rely on that.

### Background

This is a node/express project.  It is a web server which implements a number of HTTP endpoints.

It contains a demo random number generator (see `index.js`).  The endpoints are:

- `/test/maximum` (GET): get the current *maximum* value
- `/test/maximum` (PUSH): set the current *maximum* value
- `/test/random` (GET): get a random integer between 0 (inclusive) and *maximum* (exclusive)

There are tests in the `tests` directory.

One set of tests uses [mocha](https://www.npmjs.com/package/mocha) and [chai](https://www.npmjs.com/package/chai).

Run these tests with:

    $ make random

A second set of "quick" tests is just a shell script and is more suitable for quick testing.

Run the quick test by first starting the server in one terminal:

    $ make run

And then running the tests in another terminal with:

    $ make quick

Note: this will initially fail, if you haven't yet implemented all of the necessary HTTP endpoints.

### Interactive development

You will have to restart your server quite frequently.

The `make` target `watch` in this directory uses `nodemon` to automatically restart the server whenever you
save `index.js`.

    $ make watch

I suggest running `make watch` in one terminal, and editing and running `make quick` in another.

### Task 1

An RPN calculator is a calculator for which the operands precede the operators.

Extend the implementation in `index.js` such that it implements the RPN-calculator API described in
[./RPN.md](./RPN.md).

You will have to add a number of HTTP endpoints to `index.js` (`/push`, `/peek`, `/pop`, `/add` and so on).

Ensure that `make quick` (which runs home-brew zsh tests) succeeds.

Ensure that `make rpn` (which runs the mocha RPN calculator tests) succeeds.

You should not make any changes to the tests themselves.

The only file which you need to changes in `index.js`.

Marking... this must succeed:

    $ make rpn

### Task 2

Do not proceed to this task until you have successfully completed task 1.

Complete the `.gitlab-ci.yml` CI config files such that the `random` **and** `rpn` tests
are run (and pass!) when you push your work to GitLab.

Check under "CI/CD" / "Jobs" on GitLab.  Fix any issues which arise (although there really shouldn't be any).

The only file which you need to changes in `.gitlab-ci.yml`.

Marking... I will examine your `.gitlab-ci.yml` manually.

### Task 3

Do not proceed to this task until you have successfully completed task 1 (task 2 doesn't matter).

Look at the bottom of the `Makefile` in this directory, specifically the targets `up`, `docker` and `down`.

Marking... this must succeed:

    $ make up
    $ make docker
    $ make down

- `up` uses `docker compose` to bring up a docker container.
- `docker` runs the same RPN tests as before, but this time against an existing server running on port 8000; this will be your server running inside a docker container.
- `down` brings the docker container down again.

Your task is to:

1. complete the `Dockerfile` in this directory such that it defines a docker image containing your RPN app;
   don't forget to include the necessary `node_modules` in your image, and
2. complete the `docker-compose.yml` file in this directory to bring up a container running your image.

You should map port 8000 on `localhost` to whichever port your app is listening on inside the container
(probably also port 8000).

This task is very similar to one of the tasks in last week's `ca282-docker-demo` repo.

When you are done, push your work back to the `master` branch in your project on GitLab.

The only files which you need to change are `Dockerfile` and `docker-compose.yml`.

