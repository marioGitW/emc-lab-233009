import { Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useHosts from '../../../hooks/useHosts.ts';
import PageHeader from '../../components/PageHeader.tsx';
import LoadingState from '../../components/LoadingState.tsx';
import ErrorState from '../../components/ErrorState.tsx';
import EmptyState from '../../components/EmptyState.tsx';
import HostCard from '../../components/HostCard.tsx';

const HostsPage = () => {
    const { hosts, loading, error } = useHosts();
    const navigate = useNavigate();

    if (loading) {
        return <LoadingState message="Loading hosts..." />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    return (
        <Box>
            <PageHeader
                title="Hosts"
                subtitle="Meet and connect with accommodation hosts"
            />
            {hosts.length === 0 ? (
                <EmptyState message="No hosts available at the moment." />
            ) : (
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    {hosts.map((host) => (
                        <Grid key={host.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <HostCard host={host} onView={(id) => navigate(`/hosts/${id}`)} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default HostsPage;
