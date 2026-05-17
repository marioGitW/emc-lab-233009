import { Box, Button, Stack, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.tsx';
import PageHeader from '../../components/PageHeader.tsx';

const Home = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuth();

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

            {isAuthenticated && user && (
                <Box sx={{ my: 3, maxWidth: '600px', width: '100%' }}>
                    <Alert severity="success">
                        Welcome back, {user.name}! You're logged in as {user.role?.replace('ROLE_', '')}.
                    </Alert>
                </Box>
            )}

            {!isAuthenticated && (
                <Box sx={{ my: 3, maxWidth: '600px', width: '100%' }}>
                    <Alert severity="info">
                        Sign in to your account to browse and book accommodations, or create a new account to get started!
                    </Alert>
                </Box>
            )}

            <Box sx={{ my: 4, maxWidth: '600px' }}>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    {isAuthenticated ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/login')}
                                sx={{ minWidth: '200px' }}
                            >
                                Login to Your Account
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/register')}
                                sx={{ minWidth: '200px' }}
                            >
                                Create New Account
                            </Button>
                        </>
                    )}
                </Stack>
            </Box>
        </Box>
    );
};

export default Home;





