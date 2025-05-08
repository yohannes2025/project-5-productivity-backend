import axios from "axios";
axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true; // Enable sending cookies with requests

export const axiosReq = axios.create();
export const axiosRes = axios.create();
