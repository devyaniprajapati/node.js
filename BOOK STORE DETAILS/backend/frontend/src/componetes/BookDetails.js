import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBooks } from "../api";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const result = await getBooks();
      const bookToView = result.data.find((book) => book._id === id);
      if (bookToView) {
        setBook(bookToView);
      }
    };
    fetchBookDetails();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Price: ${book.price}</p>
      <p>Description: {book.description}</p>
      <p>ISBN: {book.isbn}</p>
    </div>
  );
};

export default BookDetails;
