import React, {  useContext} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { Button, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import HomePage from './Home';
import ErrorPage from './ErrorPage';
import Register from './RegisterForm';
import Login from './LoginForm';
import Logout from './Logout';
import AddClients from './Clients';
import Booking from './CarBooking';
//import { Button, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import ClientsDetail from './ShowClients';
import BookingsDetail from './ShowBookings';
import AllClients from './AllClients';
import AllBookings from './AllBookings';
import { UserContext } from './App';

//after login
//const pages = ['clientsdetail', 'bookingsdetail', 'addclients'];
const settings = ['Profile'];
//before login
//const hiddenpages = ['signup', 'login'];
//const hiddensettings = ['Profile'];

const NavBar = () => {

    const { state, dispatch } = useContext(UserContext);

    const logoutUser = () => {
        localStorage.removeItem('token');
        dispatch({ type: "USER", payload: false })
    }

    const RenderMenu = () => {

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

        if (state) {
            return (
                <>
                    <Router>
                        {/*When User Loogen IN*/}
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
                                        <img style={{ width: 40 }}
                                            src="https://lh4.googleusercontent.com/t7ytj3VN0AQfbzrgY_a_Oii2NWyq7X-kCYkF6qv-vgewjxefvX77ci_E_DPsH4CSpTcolfkJ3w5dYJI6z7FtClO2rZxyi3tHwJU7fDexJTVjYsxd9y8sL7wAcgM2zB9YfdqTmFYn"
                                            alt="new"
                                        />
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
                                            <Button sx={{ my: 2, color: 'brown', display: 'block' }}>
                                                <Link style={{ color: '#FFEF00', textDecoration: 'none' }} to="/">Home</Link>
                                            </Button>
                                            <Button sx={{ my: 2, color: 'brown', display: 'block' }}>
                                                <Link style={{ color: '#FFEF00', textDecoration: 'none' }} to="/addclients">AddClients</Link>
                                            </Button>
                                            <Button sx={{ my: 2, color: 'brown', display: 'block' }}>
                                                <Link style={{ color: '#FFEF00', textDecoration: 'none' }} to="/clientsdetail">ClientsDetail</Link>
                                            </Button>
                                            <Button sx={{ my: 2, color: 'brown', display: 'block' }}>
                                                <Link style={{ color: '#FFEF00', textDecoration: 'none' }} to="/bookingsdetail">BookingsDetail</Link>
                                            </Button>
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
                                        <Button sx={{ my: 2, color: 'brown', display: 'block' }}>
                                            <Link style={{ color: '#FFEF00', textDecoration: 'none' }} to="/addclients">AddClients</Link>
                                        </Button>
                                        <Button sx={{ my: 2, color: 'brown', display: 'block' }}>
                                            <Link style={{ color: '#FFEF00', textDecoration: 'none' }} to="/clientsdetail">ClientsDetail</Link>
                                        </Button>
                                        <Button sx={{ my: 2, color: 'brown', display: 'block' }}>
                                            <Link style={{ color: '#FFEF00', textDecoration: 'none' }} to="/bookingsdetail">BookingsDetail</Link>
                                        </Button>
                                        {/*
                                        {pages.map((page) => (
                                            <Button
                                                key={page}
                                                onClick={handleCloseNavMenu}
                                                sx={{ my: 2, color: 'brown', display: 'block' }}
                                            >
                                                <Link style={{ color: '#FFEF00', textDecoration: 'none' }} to={`/${page}`}>{page}</Link>
                                            </Button>

                                        ))}
                                        */}

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
                                            {/* Appbar Profile Items / yahi pa oor links ay gy*/}
                                            {settings.map((setting) => (
                                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                    <Typography textAlign="center"><Link style={{ color: 'black', textDecoration: 'none' }} to={`/${setting}`}>{setting}</Link></Typography>
                                                </MenuItem>
                                            ))}
                                            <MenuItem onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center"><Link onClick={logoutUser} style={{ color: 'black', textDecoration: 'none' }} to={`/login`}>Logout</Link></Typography>
                                            </MenuItem>
                                        </Menu>
                                    </Box>
                                </Toolbar>
                            </Container>
                        </AppBar>

                        <Switch>
                            <Route exact path='/'>
                                <HomePage />
                            </Route>
                            <Route path='/addclients'>
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
                            <Route path='/clientsdetail'>
                                <AllClients />
                            </Route>
                            <Route path='/bookingsdetail'>
                                <AllBookings />
                            </Route>
                            <Route path='/Logout'>
                                <Logout />
                            </Route>
                            <Route>
                                <ErrorPage />{/* if you go on wrong address */}
                            </Route>
                        </Switch>
                    </Router>
                </>
            );
        } else {
            return (
                <Router>
                    {/*when user logout*/}
                    <AppBar style={{ background: '#4C4E53' }} position="static">
                        <Container maxWidth="xl">
                            <Toolbar disableGutters>


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
                                        <Button sx={{ my: 2, color: 'brown', display: 'block' }}>
                                            <Link style={{ color: '#FFEF00', textDecoration: 'none' }} to="/signup">SignUp</Link>
                                        </Button>
                                        <Button sx={{ my: 2, color: 'brown', display: 'block' }}>
                                            <Link style={{ color: '#FFEF00', textDecoration: 'none' }} to="/login">Login</Link>
                                        </Button>
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
                                        <Link style={{ color: '#FFEF00', textDecoration: 'none' }} to="/signup">SignUp</Link>
                                    </Button>
                                    <Button sx={{ my: 2, color: 'brown', display: 'block' }}>
                                        <Link style={{ color: '#FFEF00', textDecoration: 'none' }} to="/login">Login</Link>
                                    </Button>
                                    {/* Appbar Button Items / yahi pa oor links ay gy*/}
                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar>
                    <Switch>
                        <Route exact path='/'>
                            <Login />
                        </Route>
                        <Route path="/signup">
                            <Register />
                        </Route>
                        <Route path='/login'>
                            <Login />
                        </Route>
                        <Route>
                            <ErrorPage />{/* if you go on wrong address */}
                        </Route>
                    </Switch>
                </Router>
            );
        }
    }

    return (
        <RenderMenu />
    )
}
export default NavBar;