

const http = require('http'); // http module
const fs = require('fs'); // fs module to read/write content

const server = http.createServer((request, response) => { // create a server using http module

    console.log('[Client request URL]: ', request.url); // see what URL clients are requesting:

    // A basic route
    if(request.url === '/') {
        fs.readFile('index.html', 'utf8', (errors, contents) => { // start callback
            response.writeHead(200, {'Content-Type': 'text/html'}); // send status code and headers
            response.write(contents);  // send response body
            response.end(); // close out the response
        });
    }

    // For linked CSS files
    else if(request.url === '/style.css'){
        fs.readFile('style.css', 'utf8', (errors, contents) => {
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(contents);
            response.end();
        });
    }

    // for any image!
    else if(request.url === '/image.png'){
        fs.readFile('image.png', (errors, contents) => {
            response.writeHead(200, {'Content-Type': 'image/png'});
            response.write(contents);
            response.end();
        });
    }

    // The error route -- make this an error page
    else {
        response.writeHead(404);
        response.end('File not found!');
    }

});

// FINALLY, tell server to listen to port
server.listen(6789);