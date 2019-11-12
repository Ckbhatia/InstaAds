const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Auth = require("../auth/auth");

// Protect the route
router.use(Auth.verToken);

// Get user
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne(
      { username: req.params.username },
      "-password"
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: "User does't exist", status: "failed" });
    }
    res
      .status(200)
      .json({ message: "User found successfully", status: "success", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "There's an error", status: "success", error });
  }
});

module.exports = router;
