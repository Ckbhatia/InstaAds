const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");
const Auth = require("../auth/auth");

// Protect the route
router.use(Auth.verToken);

// Post request
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

// Put the post
router.put("/:postid", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid);
    // Checks if the post has same author
    if (post.author._id == req.user.id) {
      const updatePost = await Post.findByIdAndUpdate(
        req.params.postid,
        req.body
      );
      res.status(200).json({
        message: "Post updated successfully",
        status: "success"
      });
    } else {
      res
        .status(401)
        .json({ message: "User not authorized", status: "failed" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "There's an error", status: "failed", error });
  }
});

// Delete the post
router.delete("/:postid", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid);
    // Checks if the post has same author
    if (post.author._id == req.user.id) {
      const deletePost = await Post.findByIdAndDelete(req.params.postid);
      res.status(200).json({
        message: "Post deleted successfully",
        status: "success"
      });
    } else {
      res
        .status(401)
        .json({ message: "User not authorized", status: "failed" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "There's an error", status: "failed", error });
  }
});

module.exports = router;
