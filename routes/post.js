const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const Auth = require("../auth/auth");

// Protect the route
router.use(Auth.verToken);

// Post post request
router.post("/", async (req, res) => {
  // Set request body author
  req.body.author = req.user;
  try {
    const post = await Post.create(req.body);
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { post: post.id } },
      { safe: true, upsert: true, new: true }
    );

    res
      .status(200)
      .json({ message: "Post created successfully", status: "success" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "There's an error", status: "failed", error });
  }
});

module.exports = router;
