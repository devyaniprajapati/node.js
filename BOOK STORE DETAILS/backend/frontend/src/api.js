import axios from 'axios';

const API_URL = 'http://localhost:5000/books';

export const getBooks = () => axios.get(API_URL);
export const createBook = (newBook) => axios.post(API_URL, newBook);
export const updateBook = (id, updatedBook) => axios.put(`${API_URL}/${id}`, updatedBook);
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);
