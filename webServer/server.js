const http = require("http");
const fs = require('fs').promises;

const mysql = require('mysql');
const db = mysql.createConnection({host: "localhost", user: "user", password: "userPass"});
db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  });

const host = 'localhost';
const port = 8000;


const requestListener = function (req, res) {
    var url = "/home.html";
    switch (req.url) {
        case "/":
            url="/home.html";
            break
        case "/profil":
            url="/profil.html";
            break


    }

    fs.readFile(__dirname + url)
            .then(contents => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(contents);
                // console.log(`req.url is`+req.url);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(toString(err));
                console.error(`Could not read a file: ${err}`);
                process.exit(1);
            });
            
};


const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
