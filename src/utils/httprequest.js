import axios from "axios";

export const httpRequest = axios.create({
  baseURL: process.env.REACT_NATIVE_BASE_URL,
});
