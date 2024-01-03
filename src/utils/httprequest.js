import axios from "axios";

export const httpRequest = axios.create({
  baseURL: "http://192.168.1.2:1407/api/",
});