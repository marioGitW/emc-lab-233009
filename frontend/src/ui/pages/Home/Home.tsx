import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.tsx';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center'
        }}>
            <PageHeader
                title="Welcome to Accommodation Booking"
                subtitle="Find and book the perfect accommodation for your next trip"
            />
            <Box sx={{ my: 4, maxWidth: '600px' }}>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/accommodations')}
                        sx={{ minWidth: '200px' }}
                    >
                        Browse Accommodations
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/hosts')}
                        sx={{ minWidth: '200px' }}
                    >
                        Meet Hosts
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() => navigate('/countries')}
                        sx={{ minWidth: '200px' }}
                    >
                        Explore Countries
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default Home;





