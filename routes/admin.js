const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Auth = require("../auth/auth");

// Verify the token
router.use(Auth.verToken);

// Get dashboard
router.get("/dashboard", (req, res) => {
  // console.log(req.isInstaAdmin, req.user);
  if (req.isInstaAdmin) {
    Post.find({ isApprove: false })
      .sort({ createdAt: -1 })
      .exec((err, post) => {
        if (err)
          return res.json({
            message: "There's error",
            status: "failed",
            error: err
          });
        return res.json({ message: "success", post });
      });
  } else {
    res.status(401).json({ message: "User not authorized" });
  }
});

module.exports = router;
