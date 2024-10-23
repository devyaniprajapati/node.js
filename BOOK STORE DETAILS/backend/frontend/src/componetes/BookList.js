import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../api";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await getBooks();
      setBooks(result.data);
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    await deleteBook(id);
    setBooks(books.filter(book => book._id !== id));
  };

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book._id} className="book-item">
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.price}</p>
          <button onClick={() => handleDelete(book._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
