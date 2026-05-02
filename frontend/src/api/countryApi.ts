import axiosInstance from '../axios/axios.ts';
import type { Country } from './types/country.ts';

const countryApi = {
    findAll: async () => {
        return await axiosInstance.get('/countries');
    },

    findById: async (id: number) => {
        return await axiosInstance.get<Country>(`/countries/${id}`);
    }
};

export default countryApi;

