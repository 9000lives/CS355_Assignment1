//Deployed URL: https://cs355assignment1.onrender.com/

const http = require('http');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require("mongodb");
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let collection;

async function connectDB() {
    try {
        await client.connect();
        collection = client.db("minecraft").collection("minecraft");
        console.log("Connected to MongoDB");
    } catch (e) {
        console.error("MongoDB connection failed:", e);
        process.exit(1);
    }
}

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
    // else if(req.url === '/api') {      
    //     fs.readFile( path.join(__dirname, 'db.json'),
    //         (err, content) => {
    //             if(err) {
    //                     res.writeHead(500);
    //                     res.end('Server error');
    //                     return;
    //                     }
    //             res.writeHead(200, {'Content-Type': 'application/JSON'})
    //             res.end(content);
    //         }
    //     );
    // }
    else  if (req.url === '/api' && req.method === 'GET') {
            // Your existing fetch-all code
            collection.find({}).toArray()
                .then(results => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(results));
                })
                .catch(err => {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: "Failed to fetch books" }));
                });
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/HTML'})
        res.end("<h1> 404 </h1>")
    }
    console.log(req.url);
});

connectDB().then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});