const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5001;
const hostname = "127.0.0.1";
const todoRouter = require("./src/routers/todoRouter");
require("./src/config/databaseConnection");

app.use(express.json());

app.use("/api", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
