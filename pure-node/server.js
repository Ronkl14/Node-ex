const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/raw-html") {
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Welcome</h1>");
    } else if (req.url === "/users") {
      const filePath = path.join(__dirname, "users.json");
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Error getting the users data");
        } else {
          res.setHeader("Content-Type", "application/json");
          res.end(data);
        }
      });
    } else if (req.url === "/") {
      const filePath = path.join(__dirname, "index.html");
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Error getting the index file");
        } else {
          res.setHeader("Content-Type", "text/html");
          res.end(data);
        }
      });
    } else if (req.url === "/index.css") {
      const filePath = path.join(__dirname, "index.css");
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Error getting the CSS file");
        } else {
          res.setHeader("Content-Type", "text/css");
          res.end(data);
        }
      });
    } else if (req.url === "/index.js") {
      const filePath = path.join(__dirname, "index.js");
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Error getting the JS file");
        } else {
          res.setHeader("Content-Type", "text/javascript");
          res.end(data);
        }
      });
    } else {
      res.statusCode = 404;
      res.end("Page not found");
    }
  } else {
    res.statusCode = 405;
    res.end("Method not allowed");
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
