var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

// Connect mongoose
mongoose.connect(
  process.env.MONGOURL || "mongodb://localhost/conduit_api",
  { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    err ? console.log(err) : console.log("success mongodb connected");
  }
);

/* GET home page. */
router.get("/", function(req, res, next) {
  // TODO: show user timeline based on current location of user
  res.send("Response send");
});

module.exports = router;
