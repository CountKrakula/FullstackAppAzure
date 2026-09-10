import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7031/api/"
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getAllSubscriptions = async () => {
    const response = await api.get("Subscription");
    return response.data; 
}

export const createSubscription = async (subscription) => {
    const response = await api.post("Subscription", subscription);
    return response.data;
}

export const updateSubscription = async (id, subscription) => {
    const response = await api.put(`Subscription/${id}`, subscription);
    return response.data;
}

export const deleteSubscription = async (id) => {
    const response = await api.delete(`Subscription/${id}`);
}