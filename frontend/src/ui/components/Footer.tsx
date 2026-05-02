import { Box, Container, Typography, Link as MuiLink, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box component="footer" sx={{ py: 3, mt: 6, borderTop: '1px solid #ddd', backgroundColor: '#f5f5f5' }}>
            <Container maxWidth="lg">
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3, mb: 3 }}>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Pages
                        </Typography>
                        <Stack spacing={0.5}>
                            <MuiLink component={Link} to="/accommodations" color="inherit" sx={{ textDecoration: 'none' }}>
                                Accommodations
                            </MuiLink>
                            <MuiLink component={Link} to="/hosts" color="inherit" sx={{ textDecoration: 'none' }}>
                                Hosts
                            </MuiLink>
                            <MuiLink component={Link} to="/countries" color="inherit" sx={{ textDecoration: 'none' }}>
                                Countries
                            </MuiLink>
                        </Stack>
                    </Box>

                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Info
                        </Typography>
                        <Stack spacing={0.5}>
                            <Typography variant="body2">About</Typography>
                            <Typography variant="body2">Contact</Typography>
                            <Typography variant="body2">Privacy</Typography>
                        </Stack>
                    </Box>

                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                            Follow
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <EmailIcon sx={{ color: '#666' }} />
                            <Typography variant="body2">Email</Typography>
                        </Stack>
                    </Box>
                </Box>

                <Box sx={{ borderTop: '1px solid #ddd', pt: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="textSecondary">
                        © {currentYear} Accommodations App. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;

