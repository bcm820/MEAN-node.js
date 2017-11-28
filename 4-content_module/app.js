

const http = require('http');
const static = require('./static');
const server = http.createServer(static);
server.listen(8000);