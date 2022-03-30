var sqlite3 = require('sqlite3').verbose();

exports.dbConnect = () => {
  return new sqlite3.Database('./database/OGchinook.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });
};

exports.dbGetUser = (db, email) => {
  let sql = `SELECT * FROM Users WHERE email = ?`;

  return db.get(sql, [email], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    return row ? res.status(409).send("User Already Exist. Please Login") : row
  })
}

exports.dbClose = () => {
  db.close();
};



