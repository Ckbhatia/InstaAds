var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  // TODO: show user timeline based on current location of user
  res.send("Response send");
});

module.exports = router;
