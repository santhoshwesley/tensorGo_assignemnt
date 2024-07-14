const passport = require("passport");

exports.googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

(exports.googleAuthCallback = passport.authenticate("google", {
  failureRedirect: "/",
})),
  (req, res) => {
    try {
      res.json({ token: req.user.token });
    } catch (error) {
      next(error);
    }
  };

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("https://accounts.google.com/logout");
  });
};
