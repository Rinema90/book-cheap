import axios from "axios";

// Définir l'URL de base de l'API
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getBooks = async () => {
  try {
    const response = await api.get("/books");
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
