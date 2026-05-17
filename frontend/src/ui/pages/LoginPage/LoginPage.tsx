import { useState } from 'react';
import { Container, Paper, TextField, Button, Box, Typography, Alert, FormControlLabel, Checkbox } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.tsx';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, isLoading } = useAuth();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.username || !formData.password) {
            setError('Please enter both username and password');
            return;
        }

        try {
            await login(formData.username, formData.password);
            // Navigate to accommodations page
            navigate('/accommodations');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Login
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Sign in to your account
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={isLoading}
                        autoComplete="username"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={isLoading}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                                disabled={isLoading}
                            />
                        }
                        label="Show password"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ py: 1.5 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </Box>

                <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #eee', textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        <strong>Demo Credentials:</strong><br />
                        Username: bob_brown<br />
                        Password: password123
                    </Typography>
                    <Typography variant="body2">
                        Don't have an account?{' '}
                        <Box
                            component={Link}
                            to="/register"
                            sx={{
                                color: 'primary.main',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            Register here
                        </Box>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;

