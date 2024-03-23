import axios from "axios";

const API_URL = "https://vue-moire.skillbox.cc/"
const http = axios.create({
    baseURL: `https://${API_URL}`,
    headers: {
      "Content-Type": "application/json",
      
    },
  });

  export default http;