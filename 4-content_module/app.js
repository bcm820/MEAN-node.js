

const http = require('http');
const static = require('./static.js');
const server = http.createServer(static);
server.listen(8000);