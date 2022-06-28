import axios from "axios";

export const apiCallBooks = axios.create({
  baseURL: `http://localhost:3000/`,
  headers: {
    "Content-type": "application/json",
  },
});
