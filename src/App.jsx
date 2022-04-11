import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import HomePage from './Home';
import ErrorPage from './ErrorPage';
import Register from './RegisterForm';
import Login from './LoginForm';
import Logout from './Logout';
import AddClients from './Clients';
import Booking from './CarBooking';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, TextField, Card, CardContent, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import ClientsDetail from './ShowClients';
import BookingsDetail from './ShowBookings';


const pages = ['clients', 'signup', 'login'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const App = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    return (
        <>

            {/* Navbar */}
            <Router>
                {/* Appbar start */}
                <AppBar style={{ background: '#4C4E53' }} position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            >
                                LOGO
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            {/* Appbar Items */}

                                            <Typography textAlign="center">
                                                <Link style={{ color: 'white', textDecoration: 'none' }} to="/">Home</Link>
                                                <Link to={`/${page}`}>{page}</Link>
                                            </Typography>
                                            {/* Appbar Items */}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                            >
                                LOGO
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {/* Appbar Button Items / yahi pa oor links ay gy*/}
                                <Button sx={{ my: 2, color: 'brown', display: 'block' }}>
                                    <Link style={{ color: '#FFEF00', textDecoration: 'none' }} to="/">Home</Link>
                                </Button>
                                {pages.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'brown', display: 'block' }}
                                    >
                                        <Link style={{ color: '#FFEF00', textDecoration: 'none' }} to={`/${page}`}>{page}</Link>
                                    </Button>

                                ))}
                                {/* Appbar Button Items / yahi pa oor links ay gy*/}
                            </Box>

                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>

                {/* Appbar ends */}
                <Switch>
                    <Route exact path='/'>
                        <HomePage />
                    </Route>
                    <Route path="/signup">
                        <Register />
                    </Route>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <Route path='/logout'>
                        <Logout />
                    </Route>
                    <Route path='/clients'>
                        <AddClients />
                    </Route>
                    <Route path='/bookings/:id'>
                        <Booking />
                    </Route>
                    <Route path='/clients-detail/:id'>
                        <ClientsDetail />
                    </Route>
                    <Route path='/bookings-detail/:id'>
                        <BookingsDetail />
                    </Route>
                    <Route>
                        <ErrorPage />{/* if you go on wrong address */}
                    </Route>
                </Switch>
            </Router>
        </>
    );
}
export default App;