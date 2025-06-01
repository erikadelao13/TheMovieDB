import {
  THE_MOVIE_DB_API_KEY,
  THE_MOVIE_DB_URL
} from "@/constants/environment";
import axios from "axios";

const instance = axios.create({
  baseURL: THE_MOVIE_DB_URL,
  params: {
    api_key: THE_MOVIE_DB_API_KEY,
    language: "en-US"
  },
  timeout: 10000
});

export default instance;
