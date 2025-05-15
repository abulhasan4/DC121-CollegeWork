// https://expressjs.com/en/starter/hello-world.html

const express = require('express')
const redis = require('redis-node')
const app = express()
const port = 8000

//                          port   hostname
client = redis.createClient(6379, "redis");

app.get('/', (req, res) => {
  // We have a client connection.
  //
  // Send a request to redis...
  client.incrby("counter", 1, function(err, counter) {
    // We have the redis response (counter).
    //
    // Send the response to our client...
    res.send(200, counter.toString() + "\n");
  });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

