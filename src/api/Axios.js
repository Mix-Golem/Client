import axios from "axios";

export const Axios = axios.create({
    baseURL: "https://backend.mixgolem.site",
    // withCredentials: true,
});
