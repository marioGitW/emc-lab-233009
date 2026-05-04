import { AppBar, Toolbar, Button, Box, Container, useMediaQuery, useTheme, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Accommodations', path: '/accommodations' },
    { label: 'Hosts', path: '/hosts' },
    { label: 'Countries', path: '/countries' },
    { label: 'Users', path: '/users' },
];

const Navigation = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const isActive = (path: string) => location.pathname === path;

    const drawerContent = (
        <Box sx={{ width: 250, p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
                    <HomeIcon color="primary" />
                    Accommodation Hub
                </Box>
                <IconButton size="small" onClick={handleDrawerToggle}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <List>
                {navigationItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            component={Link}
                            to={item.path}
                            selected={isActive(item.path)}
                            onClick={handleDrawerToggle}
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.light',
                                    color: 'primary.main',
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                    },
                                },
                            }}
                        >
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="sticky">
                <Container maxWidth="lg">
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/"
                            sx={{ textTransform: 'none', fontSize: '1.2rem', fontWeight: 'bold' }}
                        >
                            Accommodations
                        </Button>

                        {!isMobile && (
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {navigationItems.map((item) => (
                                    <Button
                                        key={item.path}
                                        color="inherit"
                                        component={Link}
                                        to={item.path}
                                        sx={{
                                            fontWeight: isActive(item.path) ? 'bold' : 'normal',
                                            borderBottom: isActive(item.path) ? '2px solid white' : 'none',
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                            </Box>
                        )}

                        {isMobile && (
                            <IconButton color="inherit" onClick={handleDrawerToggle}>
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
                {drawerContent}
            </Drawer>
        </>
    );
};

export default Navigation;

