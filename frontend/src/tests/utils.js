import axios from "axios";

export const BASE_URL = "https://localhost:8080/v1/";

export const fetchUsers = async () => {
    try {
        return await axios.get(`${BASE_URL}/user`);
    } catch (e) {
        return [];
    }
};