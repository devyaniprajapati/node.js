const Book = require("../models/book");

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author, price, description, isbn } = req.body;
  try {
    const newBook = new Book({ title, author, price, description, isbn });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to create book" });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, price, description, isbn } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, { title, author, price, description, isbn }, { new: true });
    if (!updatedBook) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to update book" });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) return res.status(404).json({ error: "Book not found" });
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book" });
  }
};
