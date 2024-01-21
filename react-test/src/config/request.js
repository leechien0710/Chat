import axios from "axios";
let token = localStorage.getItem("accessToken")
console.log(token)
export const requests = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${token}`
  }
});

