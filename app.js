var express = require("express");
var path = require("path");
var logger = require("morgan");
const mongoose = require("mongoose");

var indexRouter = require("./routes/index");

// Connect mongoose
mongoose.connect(
  process.env.MONGOURL || "mongodb://localhost/conduit_api",
  { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    err ? console.log(err) : console.log("success mongodb connected");
  }
);

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

module.exports = app;
