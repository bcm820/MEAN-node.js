module.exports = (req, res) => {

    const fs = require('fs');

    // parse URL string for filter
    let split = req.url.split('/');
    let dir = split[1];
    let file = split[split.length-1];

    // determine file type
    let type;
    let filter = (() => {
        if(req.url.endsWith('jpg')){ type = 'image/jpg'; }
        else if(req.url.endsWith('png')){ type = 'image/png'; }
        else if(req.url.endsWith('gif')){ type = 'image/gif'; }
        else if(req.url.endsWith('css')){ type = 'text/css'; }
        else if(req.url.endsWith('js')){ type = 'text/javascript'; }
        else { type = 'text/html'; }
    })();

    // create promise to check for err
    // if resolved, show requested data
    // if rejected, show error page
    const attempt = new Promise(checkURL);
    attempt.then(showData).catch(showError);

    function checkURL(resolve, reject){

        let checkData = (err, data) => {
            if(err){ reject(); }
            else { resolve(data); }
        };
        
        // attempt to read file, but only to check for an error
        // wonder how much this affects performance to run twice...
        if(type.startsWith('image')){ fs.readFile(`${dir}/${file}`, checkData); }
        else if(!type.endsWith('html')){ fs.readFile(`${dir}/${file}`, 'utf8', checkData); }
        else { fs.readFile(`views/${file}.html`, 'utf8', checkData); }
                // filename should be same as last dir in path (e.g. )
    }
    
    function showData(){

        let show = (err, data) => {
            res.writeHead(200, {'Content-Type': type});
            res.write(data);
            res.end();
        };

        // this time, actually show the requested data
        if(type.startsWith('image')){ fs.readFile(`${dir}/${file}`, show); }
        else if(!type.endsWith('html')){ fs.readFile(`${dir}/${file}`, 'utf8', show); }
        else { fs.readFile(`views/${file}.html`, 'utf8', show); }
    }

    function showError(){
        fs.readFile('views/error.html', 'utf8', (err, data) => {
            res.writeHead(404);
            res.write(data);
            res.end();
        });
    }

};