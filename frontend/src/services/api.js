import axios from "axios";

const API = axios.create({
  baseURL: "https://leetcode-tracker-ufb8.onrender.com/api"
});

export default API;