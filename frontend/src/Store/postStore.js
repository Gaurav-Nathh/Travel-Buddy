import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000/api/post"
    : "/api/post";

axios.defaults.withCredentials = true;

export const usePostStore = create((set) => ({
  user: null,
  error: null,
  isLoading: false,
  mainContent: null,
  date: null,
  buddycount: null,
  from: null,
  to: null,
  posts: [],

  create: async (mainContent, date, buddycount, from, to) => {
    set({ isLoading: true, error: null });
    try {
      console.log(mainContent);
      const response = await axios.post(`${API_URL}/create`, {
        content: {
          mainContent,
          date,
          buddycount,
          from,
          to,
        },
      });
      set({
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error creating the post.",
      });
    }
  },

  getPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/`);
      set({ posts: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: "Failed to fetch posts" });
    }
  },
}));
