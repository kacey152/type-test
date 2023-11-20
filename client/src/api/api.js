import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001', // Adjust the URL accordingly
});
export const getLeaderboards = () => {
    return axiosInstance.get('/api/leaderboards');
};
export const updateLeaderboards = (postData) => {
    return axiosInstance.post('/api/leaderboards', postData)
};