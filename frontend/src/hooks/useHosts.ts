import { useEffect, useState } from 'react';
import hostApi from '../api/hostApi.ts';
import type { Host } from '../api/types/host.ts';

interface UseHostsState {
    hosts: Host[];
    loading: boolean;
    error?: string;
}

const useHosts = () => {
    const [state, setState] = useState<UseHostsState>({
        hosts: [],
        loading: true
    });

    useEffect(() => {
        hostApi
            .findAll()
            .then((response) => {
                // Response is directly an array, not paginated
                const hosts = Array.isArray(response.data) ? response.data : response.data.content || [];
                setState({
                    hosts,
                    loading: false
                });
            })
            .catch((error) => {
                console.error('Error fetching hosts:', error);
                setState({
                    hosts: [],
                    loading: false,
                    error: error.message
                });
            });
    }, []);

    return state;
};

export default useHosts;


