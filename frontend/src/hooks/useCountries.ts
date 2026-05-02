import { useEffect, useState } from 'react';
import countryApi from '../api/countryApi.ts';
import type { Country } from '../api/types/country.ts';

interface UseCountriesState {
    countries: Country[];
    loading: boolean;
    error?: string;
}

const useCountries = () => {
    const [state, setState] = useState<UseCountriesState>({
        countries: [],
        loading: true
    });

    useEffect(() => {
        countryApi
            .findAll()
            .then((response) => {
                // Response is directly an array, not paginated
                const countries = Array.isArray(response.data) ? response.data : response.data.content || [];
                setState({
                    countries,
                    loading: false
                });
            })
            .catch((error) => {
                console.error('Error fetching countries:', error);
                setState({
                    countries: [],
                    loading: false,
                    error: error.message
                });
            });
    }, []);

    return state;
};

export default useCountries;


