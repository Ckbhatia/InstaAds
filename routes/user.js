var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Auth = require("../auth/auth");

/* POST login user. */
router.post("/login", (req, res) => {
  const { email, username, password } = req.body;
  if (!username && !email)
    return res
      .status(401)
      .json({ message: "Please enter either email or username" });
  else if (!password) {
    return res.status(401).json({ message: "Please enter password" });
  }
  User.findOne({ $or: [{ email }, { username }] }, async (err, user) => {
    if (err) return res.status(400).json({ message: err });
    if (!user)
      return res
        .status(401)
        .json({ status: "failed", message: "Invaild credentials" });
    if (!user.verifyPassword(password)) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invaild password" });
    }
    let token = await Auth.genToken(user.id);
    res
      .status(200)
      .json({ status: "success", message: "User logged in", token });
  });
});

/* Post register page */
router.post("/register", (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) return res.status(400).json({ message: err });
    res.json({ status: "success", message: "User registered", user });
  });
});

module.exports = router;
