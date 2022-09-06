const User = require("../models/user");

//For rendering the 'Register' form page
module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

//For registering a new user
module.exports.register = async (req, res, err) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to YelpCamp!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

//For rendering the 'Login' form page
module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

//For logging in a user
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome Back!");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

//For logging out a user
module.exports.logout = (req, res) => {
  req.logout(() => {
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
};
