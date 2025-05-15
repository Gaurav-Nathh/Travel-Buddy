import axios from "axios";

const url =
  import.meta.env.MODE === "development" ? "http://localhost:8000/api" : "/api";

export const axiosInstance = axios.create({
  baseURL: url,
  withCredentials: true,
});
