const http = require("http");
const fs = require('fs').promises;

var sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/OGchinook.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });


// let sql = `SELECT * FROM tracks
//            ORDER BY AlbumId LIMIT 200`;

// db.all(sql, [], (err, rows) => {
//   if (err) {
//     throw err;
//   }
  
//   rows.forEach((row) => {
//     console.log(row.Name);
//   });
// });

db.close();



const host = 'localhost';
const port = 8000;


const requestListener = function (req, res) {
    var url = "/templates/home.html";
    switch (req.url) {
        case "/":
            url="/templates/home.html";
            break
        case "/profil":
            url="/templates/profil.html";
            break
        case "/notifications":
            url="/templates/notifications.html";
            break
        case "/disconnect":
            url="/templates/disconnect.html";
            break
        // default :
        //     url="/404.html";
    }

    fs.readFile(__dirname + url)
            .then(contents => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(contents);
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
