const http = require('http'),
      fs = require('fs'),
      router = require('./router');

const server = http.createServer();

server.on('request', router)

module.exports = server;