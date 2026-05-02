import { useEffect, useState } from 'react';
import accommodationApi from '../api/accommodationApi.ts';
import type { Accommodation } from '../api/types/accommodation.ts';

interface UseAccommodationsState {
    accommodations: Accommodation[];
    loading: boolean;
    error?: string;
}

const initialState: UseAccommodationsState = {
    accommodations: [],
    loading: true
};

const useAccommodations = () => {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        accommodationApi
            .findAll()
            .then((response) => {
                setState({
                    accommodations: response.data.content || [],
                    loading: false
                });
            })
            .catch((error) => {
                    console.log(error);
                    setState({
                        accommodations: [],
                        loading: false,
                        error: error.message
                    });
                }
            );
    }, []);

    return state;
};

export default useAccommodations;
