const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  let query = {};

  if (req.user.role.name === "Member") {
    query.available = true;
  }

  const books = await Book.find(query).populate("borrowedBy", "fullName email");
  res.json(books);
};


exports.createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(book);
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
};
exports.borrowBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (!book.available) {
    return res.status(400).json({ message: "Book already borrowed" });
  }

  book.available = false;
  book.borrowedBy = req.user._id;
  book.borrowedAt = new Date();

  await book.save();

  res.json({ message: "Book borrowed successfully" });
};

exports.returnBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const isBorrower =
    book.borrowedBy &&
    book.borrowedBy.toString() === req.user._id.toString();

  const isStaff =
    req.user.role.permissions.includes("edit");

  if (!isBorrower && !isStaff) {
    return res.status(403).json({
      message: "You are not allowed to return this book"
    });
  }

  book.available = true;
  book.borrowedBy = null;
  book.borrowedAt = null;

  await book.save();

  res.json({ message: "Book returned successfully" });
};
