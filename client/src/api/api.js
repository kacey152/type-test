import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://type-test-backend.onrender.com', // Adjust the URL accordingly
});
export const getLeaderboards = () => {
    return axiosInstance.get('/api/leaderboards');
};
export const updateLeaderboards = (postData) => {
    return axiosInstance.post('/api/leaderboards', postData)
};