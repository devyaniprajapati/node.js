import React, { useState, useEffect } from "react";
import { createBook, updateBook, getBooks } from "../api";
import { useHistory, useParams } from "react-router-dom";

const BookForm = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    isbn: ""
  });
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        const result = await getBooks();
        const bookToEdit = result.data.find((book) => book._id === id);
        if (bookToEdit) {
          setBookData(bookToEdit);
        }
      };
      fetchBook();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateBook(id, bookData);
    } else {
      await createBook(bookData);
    }
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? "Edit" : "Add"} Book</h1>
      <label>Title</label>
      <input
        type="text"
        value={bookData.title}
        onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
        required
      />
      <label>Author</label>
      <input
        type="text"
        value={bookData.author}
        onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
        required
      />
      <label>Price</label>
      <input
        type="number"
        value={bookData.price}
        onChange={(e) => setBookData({ ...bookData, price: e.target.value })}
        required
      />
      <label>Description</label>
      <textarea
        value={bookData.description}
        onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
        required
      ></textarea>
      <label>ISBN</label>
      <input
        type="text"
        value={bookData.isbn}
        onChange={(e) => setBookData({ ...bookData, isbn: e.target.value })}
        required
      />
      <button type="submit">{id ? "Update" : "Add"} Book</button>
    </form>
  );
};

export default BookForm;
