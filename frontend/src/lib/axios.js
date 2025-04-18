import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",
    withCredentials: true, // Allow cookies to be sent with requests
});

export default axiosInstance;