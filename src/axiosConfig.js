// This page contains axois config with Authorization
import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_BASE_URL;

const axios1 = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

axios1.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // localStorage.clear(); // use this if needed. this will remove all items from localstorage
            delete axios1.defaults.headers.common.Authorization;
        }
        return config;
    },
    (error) => console.error(error)
);

export default axios1;
