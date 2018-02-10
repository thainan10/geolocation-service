const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
const app = express();

const port = 3000;

app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
