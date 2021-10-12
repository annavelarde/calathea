/** @format */

const router = require("express").Router();
const Post = require("../models/Post.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");

/* GET home page */
router.get("/", isLoggedIn, (req, res) => {
  Post.find({ user: req.session.user._id }).then((allPosts) => {
    res.render("index", { allPosts });
  });
});

module.exports = router;
