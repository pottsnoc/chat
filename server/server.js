const http = require('http'),
      router = require('./controller/router');
      
const server = http.createServer(router);
const io = require('socket.io')(server);
const socketHandler = require('./controller/socketHandler')(io);
io.on('connection', socketHandler);

module.exports = server;