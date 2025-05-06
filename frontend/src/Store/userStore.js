import { create } from "zustand";
import axios from "axios";
import { response } from "express";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000/api/users"
    : "/api/users";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  isLoading: false,
  message: null,

  getUser: async (username) => {
    try {
      response = await axios.get(`${API_URL}/${username}`);
      console.log(response);
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
}));
