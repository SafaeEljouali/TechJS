const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// CREATE
router.post("/", async (req, res) => {
  try {
    let finished = req.body.pagesRead === req.body.pages;

    const book = new Book({
      ...req.body,
      finished
    });

    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
});

// UPDATE pages read
router.patch("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);

  book.pagesRead = req.body.pagesRead;

  if (book.pagesRead >= book.pages) {
    book.pagesRead = book.pages;
    book.finished = true;
  }

  await book.save();
  res.json(book);
});

module.exports = router;
