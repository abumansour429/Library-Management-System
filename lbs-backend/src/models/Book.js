const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: String,
  available: { type: Boolean, default: true },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  borrowedAt: Date
});

module.exports = mongoose.model("Book", bookSchema);

