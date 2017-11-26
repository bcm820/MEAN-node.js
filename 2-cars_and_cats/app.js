
const http = require('http');
const fs = require('fs');
const server = http.createServer(cycle);

function cycle(req, res){

    let type;
    let page;
    let end = req.url.length;
    filter();

    // filter content type
    function filter(){
        if(req.url.endsWith('jpg')){
            type = 'image/jpg';
            fs.readFile(req.url.slice(1, end), render);
        }
        else if(req.url.endsWith('css')){
            type = 'text/css';
            fs.readFile(req.url.slice(1, end), 'utf8', render);
        }
        else {
            type = 'text/html';
            route();
        }
    }

    // if html, route to file
    function route(){
        switch(req.url){
            case '/cats': page = 'cats'; break;
            case '/cars': page = 'cars'; break;
            case '/cars/new': page = 'new'; break;
            default: page = 'error';
        }
        fs.readFile(`views/${page}.html`, 'utf8', render);
    }

    // render response
    function render(error, data){
        if(error){ res.writeHead(404, {'Content-Type': type}); }
        else { res.writeHead(200, {'Content-Type': type}); }
        res.write(data);
        res.end();
    }

}

server.listen(7077);