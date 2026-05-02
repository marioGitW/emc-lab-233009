import axiosInstance from '../axios/axios.ts';
import type { Host } from './types/host.ts';

const hostApi = {
    findAll: async () => {
        return await axiosInstance.get('/hosts');
    },

    findById: async (id: number) => {
        return await axiosInstance.get<Host>(`/hosts/${id}`);
    }
};

export default hostApi;

