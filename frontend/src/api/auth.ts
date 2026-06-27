import axios from "axios";

const API = "http://localhost:5000/api"; // backend URL (change later)

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return await axios.post(`${API}/auth/register`, data);
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  return await axios.post(`${API}/auth/login`, data);
};