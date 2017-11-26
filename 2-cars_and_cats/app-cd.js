

const http = require('http'),
fs = require('fs');

const server = http.createServer(function(request, response) {

const splitURL = request.url.split('/'),
fileType = splitURL[1],
file = splitURL[2];

    switch (fileType) {
        case "styles":
            serveCSS(file, response); break;
        case "images":
            serveJPG(file, response); break;
        default:
            switch(fileType){
            case "cars": // If firstChunk is 'cars', could be one of two routes.
                if (file === "new") { serveHTML("new.html", response); }
                else { serveHTML("cars.html", response); } break;
            case "cats":
                serveHTML("cats.html", response); break;
            default:
                serve404(response);
        }
    }
});

// We call on these help functions, giving each the response object (and filename in most cases) to serve the correctly-configred response
// If any callback gets an error, meaning the file wasn't found, we serve 404!

function serveHTML(filename, response) {
    fs.readFile(`views/${filename}`, 'utf8', function(error, contents){
        if (error) { return serve404(response); }
        response.writeHead(200, {'Content-type' : 'text/html' });
        response.write(contents);
        response.end();
    });
}

function serveCSS(filename, response) {
    fs.readFile(`stylesheets/${filename}`, 'utf8', function(error, contents) {
        if (error) { return serve404(response); }
        response.writeHead(200, {'Content-type' : 'text/css' });
        response.write(contents);
        response.end();
    });
}

function serveJPG(filename, response) {
    fs.readFile(`images/${filename}`, function(error, contents) {
        if (error) { return serve404(response); }
        response.writeHead(200, {'Content-type' : 'image/jpg' });
        response.write(contents);
        response.end();
    });
}

function serve404(response){
    response.writeHead(404);
    response.end("File not found!");
}

server.listen(7077);
console.log("Running on 7077");