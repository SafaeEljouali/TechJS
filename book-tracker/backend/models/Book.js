const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
  pagesRead: Number,
  price: Number,
  status: String,
  format: String,
  suggestedBy: String,
  finished: Boolean,
});

module.exports = mongoose.model("Book", bookSchema);
