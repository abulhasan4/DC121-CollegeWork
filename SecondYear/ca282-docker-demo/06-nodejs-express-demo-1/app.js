// based on: https://expressjs.com/en/starter/hello-world.html
// (but really, this is just the standard "hello world" in noejs/express)

// This process is slow to exit on TERM; adding a custom SIGTERM handler fixes this.
//
exit = function () { process.exit(0); }
process.on('SIGTERM', exit)

const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res) => {
  res.send('Hello World!\n')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
