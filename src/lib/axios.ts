import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem(
            '@autenticacao-react:token'
        )}`,
    },
});
