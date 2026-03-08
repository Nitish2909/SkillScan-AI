import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:5000/api",
   baseURL: "https://skillscan-ai-gacu.onrender.com/api",
});

export const register = async ({ username, email, password }) => {
  try {
    const res = await axiosInstance.post("/auth/register", {
      username,
      email,
      password,
    });

    return res.data;
  } catch (error) {
    toast.error(error.response?.data || { message: "Something went wrong" });
  }
};

export const login = async ({ email, password }) => {
  try {
    const res = await axiosInstance.post("/auth/login", {
      email,
      password,
    },{withCredentials:true});
    return res.data;
  } catch (error) {
    toast.error(error.response?.data || { message: "Something went wrong" });
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance.get("/auth/logout",{
        withCredentials:true
      });

    return res.data;
  } catch (error) {
    toast.error(error.response?.data || { message: "Something went wrong" });
  }
};

export const getMe = async () => {
  try {
    const res = await axiosInstance.get("/auth/get-me",
      {
        withCredentials:true
      }
    );
    return res.data;
  } catch (error) {
    toast.error(error.response?.data || { message: "Something went wrong" });
  }
};
