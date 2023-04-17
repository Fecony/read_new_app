import axios from '../lib/axios';
import toast from 'react-hot-toast';

export const csrf = () =>
    axios.get('/sanctum/csrf-cookie').catch((error) => {
        console.error(error.message);
    });
