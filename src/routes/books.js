const express = require("express");
const router = express.Router();

const books = [
   { title: "Clean Code", author: "Robert C. Martin" },
  { title: "You Don’t Know JS", author: "Kyle Simpson" },
  { title: "Deep Learning with Python", author: "François Chollet" },
  { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann" },
  { title: "Fundamentals of Data Engineering", author: "Joe Reis & Matt Housley" },
  { title: "The Data Warehouse Toolkit", author: "Ralph Kimball & Margy Ross" },
  { title: "Data Pipelines Pocket Reference", author: "James Densmore" },
  { title: "Spark: The Definitive Guide", author: "Bill Chambers & Matei Zaharia" }
];

// Middleware pour protéger la route
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

// Page des livres
router.get("/", isAuthenticated, (req, res) => {
  res.render("books", { user: req.user, books });
});

module.exports = router;
