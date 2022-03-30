const http = require("http");
const app = require("./app");

app.set("view engine", "ejs");

const PORT = 8008
const port = PORT || process.env.PORT;

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
