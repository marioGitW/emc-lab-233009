import axiosInstance from '../axios/axios.ts';
import type { User } from './types/user.ts';

const userApi = {
    findAll: async () => {
        return await axiosInstance.get('/users');
    },

    findById: async (id: number) => {
        return await axiosInstance.get<User>(`/users/${id}`);
    }
};

export default userApi;

