import axiosInstance from '../axios/axios.ts';
import type { Accommodation } from './types/accommodation.ts';

const accommodationApi = {
    findAll: async () => {
        return await axiosInstance.get('/accommodations');
    },

    findById: async (id: number) => {
        return await axiosInstance.get<Accommodation>(`/accommodations/${id}`);
    }
};

export default accommodationApi;
