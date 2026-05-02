import useAccommodations from '../../../hooks/useAccommodations.ts';
import { Box, Container } from '@mui/material';
import PageHeader from '../../components/PageHeader.tsx';
import LoadingState from '../../components/LoadingState.tsx';
import ErrorState from '../../components/ErrorState.tsx';
import EmptyState from '../../components/EmptyState.tsx';
import AccommodationCard from '../../components/AccommodationCard.tsx';

const AccommodationsPage = () => {
    const { accommodations, loading, error } = useAccommodations();

    if (loading) {
        return <LoadingState message="Loading accommodations..." />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <PageHeader title="Accommodations" />
            {accommodations.length === 0 ? (
                <EmptyState message="No accommodations available" />
            ) : (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
                        gap: 2,
                    }}
                >
                    {accommodations.map((accommodation) => (
                        <Box key={accommodation.id}>
                            <AccommodationCard accommodation={accommodation} />
                        </Box>
                    ))}
                </Box>
            )}
        </Container>
    );
};

export default AccommodationsPage;
