import { axiosInstance } from "../lib/axios";

export const fetchAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (err) {
    if (err.response && err.response.status === 401) {
      return null;
    }
    throw new Error(err.response?.data?.message || "Failed to fetch auth user");
  }
};
