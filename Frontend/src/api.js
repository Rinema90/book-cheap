import axios from "axios";

// base URL for the requests
const API_URL = "http://localhost:8080";

// ===============================
//      USERS
// ===============================

// Getting all users
export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

// Adding a user
export const addUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};

// Retrieve a user by ID
export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};

// Updating a user
export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/users/${id}`, userData);
  return response.data;
};

// Partialy updating a user
export const patchUser = async (id, userData) => {
  const response = await axios.patch(`${API_URL}/users/${id}`, userData);
  return response.data;
};

// Deleting a user
export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/users/${id}`);
  return response.data;
};

// ===============================
//      BOOKS
// ===============================

// Rretrieving all the books
export const getAllBooks = async () => {
  const response = await axios.get(`${API_URL}/books`);
  return response.data;
};

// Adding a book
export const addBook = async (bookData) => {
  const response = await axios.post(`${API_URL}/books`, bookData);
  return response.data;
};

// Retrieving a book by ID
export const getBookById = async (id) => {
  const response = await axios.get(`${API_URL}/books/${id}`);
  return response.data;
};

// Updating a book
export const updateBook = async (id, bookData) => {
  const response = await axios.put(`${API_URL}/books/${id}`, bookData);
  return response.data;
};

// Deleting a book
export const deleteBook = async (id) => {
  const response = await axios.delete(`${API_URL}/books/${id}`);
  return response.data;
};
