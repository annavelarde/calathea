const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comments.model");
const bcrypt = require("bcryptjs");

router.get("/", isLoggedIn, (req, res) => {
  Post.find({ user: req.session.user._id }).then((allPosts) => {
    res.render("profile/home", { allPosts });
  });
});

router.get("/update-profile", isLoggedIn, (req, res) => {
  res.render("profile/update-profile", {
    username: req.session.user.username, //check it fail!!!
    email: req.session.user.email,
    location: req.session.user.location,
  });
});

router.post("/update-profile", isLoggedIn, (req, res) => {
  const { username, email, location } = req.body;
  User.findByIdAndUpdate(
    req.session.user._id,
    { username, email, location },
    { new: true }
  ).then((updatedUser) => {
    // updates the user in the cookie. keeps the user in the db and the user in the session in sync
    req.session.user = updatedUser;
    res.redirect("/profile");
  });
});

router.get("/update-password", isLoggedIn, (req, res) => {
  res.render("profile/update-password");
});

router.post("/update-password", isLoggedIn, (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (oldPassword === newPassword) {
    res.render("profile/update-password", {
      errorMessage: "For security reasons, please do not use an old password",
    }); //improve the errormessage
    return;
  }

  User.findById(req.session.user._id).then((user) => {
    const arePasswordsTheSame = bcrypt.compareSync(oldPassword, user.password);

    if (!arePasswordsTheSame) {
      return res.render("profile/update-password", {
        errorMessage: "wrong credentials",
      });
    }

    if (newPassword.length < 8 || !/\d/g.test(newPassword)) {
      return res.render("profile/update-password", {
        errorMessage:
          "Your password must contain 8 characters and at least one number.",
      });
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(newPassword, salt);

    User.findByIdAndUpdate(
      user._id,
      { password: hashPassword },
      { new: true }
    ).then((updatedUser) => {
      req.session.user = updatedUser;
      res.redirect("/profile");
    });
  });
});

router.get("/delete-account", isLoggedIn, async (req, res) => {
  const userId = req.session.user._id;

  await User.findByIdAndDelete(userId);
  await Comment.deleteMany({ user: userId });

  const allPostsFromUser = await Post.find({ author: userId });
  const allPostUserIds = allPostsFromUser.map((elem) => elem._id);

  await Comment.deleteMany({ post: { $in: allPostUserIds } });
  await Post.deleteMany({ _id: { $in: allPostUserIds } });

  req.session.destroy((errorMessage) => {
    if (errorMessage) {
      console.error("err: ", errorMessage);
    }
    res.redirect("/profile");
  });
});

module.exports = router;
