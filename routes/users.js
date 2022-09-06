const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../models/user");
const passport = require("passport");
const users = require("../controllers/users");

/* Register Routes */ router
  .route("/register")
  //Route of the GET request for rendering the 'Register' form
  .get(users.renderRegister)
  //Route of the POST request for registering a new user
  .post(catchAsync(users.register));

router
  .route("/login")
  //Route of the GET request for rendering the 'Login' form
  .get(users.renderLogin)
  //Route of the POST request for logging in a user
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
      keepSessionInfo: true,
    }),
    users.login
  );

// Route of the GET request for logging out a user
router.get("/logout", users.logout);

module.exports = router;
