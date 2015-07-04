var app, compression, express, headers, path, port;

express = require('express');

compression = require('compression');

path = require('path');

headers = {
  maxAge: 31536000,
  setHeaders: function(res) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    return res.setHeader('Expires', new Date(Date.now() + 31536000).toUTCString());
  }
};

port = process.env.PORT || 8080;

app = new express();

app.use(compression()).use(express["static"](path.normalize(__dirname + '/public'), headers)).get('/connection-test', function(req, res) {
  return res.sendStatus(200);
}).listen(port);

console.log("Listening on port " + port);
