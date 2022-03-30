require("dotenv").config();
db = require("./config/database").dbConnect();

const path = require("path");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const User = require("./model/user");
const auth = require("./middleware/auth");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/login", (req, res) => {
  res.status(200).render("login");
});

app.get("/register", (req, res) => {
  res.status(200).render("register");
});


app.post("/register", async (req, res) => {

  const { email, password } = req.body;

  if (!(email && password && first_name && last_name)) {
    res.status(400).send("All input is required");
  }

  let sql = `SELECT * FROM Users WHERE email = ?`;

  // first row only
  let User = db.get(sql, [email], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    return row ? res.status(409).send("User Already Exist. Please Login") : row
  });

  //Encrypt user password
  let encryptedPassword = await bcrypt.hash(password, 10);

  try {
    db.run(`INSERT INTO Users(Email, Password) VALUES("` + email + `","` + encryptedPassword`")`, ['C'], function (err) {
      if (err) {
        return console.log(err.message);
      }
    });

    // Create token
    const token = jwt.sign(
      { user_id: User.UserId, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const { name, password } = req.body;

  // if (name === "admin" && password === "admin") {
  //   res.render("success", {
  //     username: name,
  //   });
  // } else {
  //   res.render("failure");
  // }

  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }


    const user = require("./config/database").dbGetUser(db, email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).render("home", {
        email: email,
      });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

/// besoin du token
// app.get("/home", auth, (req, res) => {
//   res.status(200).render("index");
// });
///
///// pas besoin de token
app.get("/home", (req, res) => {
  username = "manoa";
  res.status(200).render("index", {
    username: username,
  });
});


// This should be the last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;
