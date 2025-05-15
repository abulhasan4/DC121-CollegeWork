// **************************************************
// Your changes for task 1 go in this file.
//
// See below.
//
// **************************************************

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;

/**
 * Example of a different API.
 *
 * You can copy the ideas here to write your own API.
 *
 * This is an example of a random number generator.
 *
 * The HTTP endpoints are:
 *
 *   POST /test/maximum
 *
 *      The data is a JSON-encoded maximum for the random number generator, and
 *      this call sets the maximum to that value.
 *
 *   GET /test/maximum
 *
 *      Get the current maximum.
 *
 *   GET /test/random
 *
 *      Return a random number.
 */

var maxRandom = 10;

// For POST requests, parse the JSON-encoded body.  The result is stored
// in req.body. See POST "/test/maximum" example, below.
//
app.use(bodyParser.json());

// Example POST request with a JSON-encoded body.  The body is parsed into
// req.body (see above).
//
app.post("/test/maximum", function(req, res) {
  if ( req.body
       && req.body.hasOwnProperty("maximum")
       && Number.isInteger(req.body.maximum)
       && 0 < req.body.maximum ) {
    maxRandom = req.body.maximum;
    console.log("server: setting maximum to", maxRandom);
    res.setHeader("Content-Type", "text/plain");
    res.send(`server... ok, setting maximum: ${maxRandom}\n`);
  }
  else {
    res.status(400).send("bad request (invalid maximum value)\n");
  }
});

app.get("/test/maximum", function(req, res) {
  console.log("server: getting maximum", maxRandom);
  res.setHeader("Content-Type", "application/json");
  response = { maximum: maxRandom };
  res.send(JSON.stringify(response));
});

// Example GET request (including handling an error case).
//
app.get("/test/random", function(req, res) {
  if (maxRandom <= 0) {
    res.status(400).send("bad request (maximum not set)\n");
  }
  else {
    var r = Math.floor(Math.random() * maxRandom);
    console.log("server... sending random:", r);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(r) + "\n");
  }
});

/**
 * Serve static files from the directory ./static.
 */

app.use(express.static('./static'));

/* RPN calculator API.
 *
 * Javascript tips:
 *
 *   - Look carefully at the examples above.  Much of what you need to do
 *     can be achieved by copying and tweaking that code.
 *
 *   - You will need these:
 *       stack = stack.concat(values)
 *       stack.length (length of array "stack", like len(stack) in Python)
 *       value = stack.pop()
 *       stack.push(value)
 *
 *   - For the /push request, the JSON body will already have been parsed by
 *     the body parser above.  You don't need to do anything special.  Just
 *     validate req.body.values, much like the POST example above.
 *
 * The details of the required API are defined in static/README.md.
 */

// This is your stack; it's a Javascript array.
//
var stack = [];

app.post("/push", function(req, res) {
  // this seems like the obvious place to start.
});












/**
 * (You shouldn't have to change anything ABOVE here.)
 */

/*
 * YOUR WORK GOES **BELOW** HERE!
 *
 * Note...
 * The API above has endpoint names of the form "/test/____" (because it's just a demo).
 *
 * The endpoint names below will not include "/test", so they'll be things like "/pop",
 * or "/push".
 */






/**
 * YOUR WORK GOES **ABOVE** HERE.
 *
 * (You shouldn't have to change anything BELOW here.)
 *
 * 404/not found, and start the server on the indicated port.
 */

app.post("/*", function(req, res) { res.status(404).send("not found\n"); });
app.get("/*", function(req, res) { res.status(404).send("not found\n"); });

app.listen(port, function() {
  console.log("listening on port", port, "...");
});

module.exports = app
