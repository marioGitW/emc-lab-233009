import { useParams, useNavigate } from 'react-router-dom';
import useAccommodationDetails from '../../../hooks/useAccommodationDetails.ts';
import { Box, Button, Card, CardContent, Typography, Container } from '@mui/material';
import LoadingState from '../../components/LoadingState.tsx';
import ErrorState from '../../components/ErrorState.tsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AccommodationDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const accommodationId = id ? parseInt(id) : 0;
    const { accommodation, loading, error } = useAccommodationDetails(accommodationId);

    if (loading) {
        return <LoadingState message="Loading details..." />;
    }

    if (error || !accommodation) {
        return <ErrorState message={error || "Accommodation not found"} />;
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/accommodations')}
                sx={{ mb: 3 }}
            >
                Back to Accommodations
            </Button>

            <Card sx={{ p: 3 }}>
                <CardContent>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                        {accommodation.name}
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2, mb: 3 }}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'gray' }}>
                                Category
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {accommodation.category}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'gray' }}>
                                Number of Rooms
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {accommodation.numRooms}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'gray' }}>
                                Condition
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {accommodation.condition}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'gray' }}>
                                Status
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    mb: 2,
                                    color: accommodation.rented ? 'red' : 'green',
                                    fontWeight: 'bold'
                                }}
                            >
                                {accommodation.rented ? 'Rented' : 'Available'}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'gray' }}>
                                Host ID
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                {accommodation.hostId}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default AccommodationDetailsPage;

