import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
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