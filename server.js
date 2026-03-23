const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 5959;

const server = http.createServer((req, res)=> {
    if(req.url === '/' || req.url === '/index.html') {      
        fs.readFile( path.join(__dirname, 'public', 'index.html'),
            (err, content) => {
                if(err) {
                        res.writeHead(500);
                        res.end('Server error');
                        return;
                        }
                res.writeHead(200, {'Content-Type': 'text/HTML'})
                res.end(content);
            }
        );
    }
    else if(req.url === '/api') {      
        fs.readFile( path.join(__dirname, 'db.json'),
            (err, content) => {
                if(err) {
                        res.writeHead(500);
                        res.end('Server error');
                        return;
                        }
                res.writeHead(200, {'Content-Type': 'application/JSON'})
                res.end(content);
            }
        );
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/HTML'})
        res.end("<h1> 404 </h1>")
    }
    console.log(req.url);
});

server.listen(PORT, ()=> console.log("Yay it works, server running"));