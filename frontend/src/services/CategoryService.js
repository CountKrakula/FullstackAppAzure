import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
});


export const getAllCategories = async () => {
    const response = await api.get("Category");
    return response.data; 
}

export const createCategory = async (category) => {
    const response = await api.post("Category", category);
    return response.data;
}

