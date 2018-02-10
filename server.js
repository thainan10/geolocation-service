const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
const app = express();

const port = require('./config/settings').application_port;

var db = require('./config/database');

app.use(bodyParser.json());

db.connect(app.settings.env, (err) => {
  if (err) console.log(err);
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});

module.exports = app;
