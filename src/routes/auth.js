const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();

// Page d’inscription
router.get("/register", (req, res) => {
  res.render("register", { message: req.flash("error") });
});

// Envoi formulaire inscription
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username });
  if (userExists) {
    req.flash("error", "Username already taken");
    return res.redirect("/register");
  }
  await new User({ username, password }).save();
  res.redirect("/login");
});

// Page de login
router.get("/login", (req, res) => {
  res.render("login", { message: req.flash("error") });
});

// Envoi formulaire login
router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/books",
    failureRedirect: "/login",
    failureFlash: true
  })
);

// Déconnexion
router.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/login"));
});

module.exports = router;
