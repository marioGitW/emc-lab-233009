import { AppBar, Toolbar, Button, Box, Container, useMediaQuery, useTheme, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';

const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Accommodations', path: '/accommodations' },
    { label: 'Hosts', path: '/hosts' },
    { label: 'Countries', path: '/countries' },
    { label: 'Users', path: '/users' },
    { label: 'Reservations', path: '/reservations' },
];

const Navigation = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout, user } = useAuth();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        setMobileOpen(false);
        setMenuAnchor(null);
    };

    const isActive = (path: string) => location.pathname === path;

    const getUserInitials = () => {
        if (!user) return '?';
        const first = user.name?.charAt(0) || '';
        const second = user.surname?.charAt(0) || '';
        return `${first}${second}`.toUpperCase();
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

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
            {isAuthenticated && user ? (
                <>
                    <Divider />
                    <Box sx={{ p: 2, backgroundColor: 'primary.light', borderRadius: 1, mb: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                                {getUserInitials()}
                            </Avatar>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    {user.name} {user.surname}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    {user.role?.replace('ROLE_', '')}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout} sx={{ color: 'error.main' }}>
                            <LogoutIcon sx={{ mr: 1 }} />
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </>
            ) : (
                <>
                    <Divider />
                    <ListItem disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            component={Link}
                            to="/login"
                            onClick={handleDrawerToggle}
                        >
                            <LoginIcon sx={{ mr: 1 }} />
                            <ListItemText primary="Login" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            component={Link}
                            to="/register"
                            onClick={handleDrawerToggle}
                        >
                            <PersonAddIcon sx={{ mr: 1 }} />
                            <ListItemText primary="Register" />
                        </ListItemButton>
                    </ListItem>
                </>
            )}
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
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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
                                {isAuthenticated && user ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                                        <Avatar
                                            onClick={handleMenuOpen}
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                bgcolor: 'secondary.main',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {getUserInitials()}
                                        </Avatar>
                                        <Menu
                                            anchorEl={menuAnchor}
                                            open={Boolean(menuAnchor)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem disabled>
                                                <Box>
                                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                        {user.name} {user.surname}
                                                    </Typography>
                                                    <Typography variant="caption">
                                                        {user.role?.replace('ROLE_', '')}
                                                    </Typography>
                                                </Box>
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem onClick={handleLogout}>
                                                <LogoutIcon sx={{ mr: 1 }} />
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                ) : (
                                    <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                                        <Button
                                            color="inherit"
                                            component={Link}
                                            to="/login"
                                            startIcon={<LoginIcon />}
                                        >
                                            Login
                                        </Button>
                                        <Button
                                            color="inherit"
                                            variant="outlined"
                                            component={Link}
                                            to="/register"
                                            startIcon={<PersonAddIcon />}
                                            sx={{
                                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                                '&:hover': {
                                                    borderColor: 'white',
                                                }
                                            }}
                                        >
                                            Register
                                        </Button>
                                    </Box>
                                )}
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
