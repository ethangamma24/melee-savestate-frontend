const compression = require("compression");
const express = require("express");
const path = require("path");
const app = express();

const http = require("http");
const body_parser = require("body-parser");

const api = require("./api");

// app.use(compression());
app.use(express.static(path.join(__dirname, "/dist/melee-savestate-frontend")));

app.use(body_parser.json());
app.use(
  body_parser.urlencoded({
    extended: true,
  })
);

app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "dist/melee-savestate-frontend/index.html")
  );
});

const port = 80;
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on localhost:${port}`));

module.exports = app;
