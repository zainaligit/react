import React, { useContext } from "react";
import { UserContext } from "./App";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Snackbar, Stack, Grid, Paper, Button, TextField, Card, CardContent, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();
  const [user, setUser] = useState({
    email: '', password: '',
  });

  let name, value;
  const handleInput = (e) => {

    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    });
    setUser('');
    const data = await res.json();
    if (res.status === 400 || !data) {
      toast.error('Invalid credentials')
    } else {
      dispatch({ type: "USER", payload: true })
      localStorage.setItem('token', data.user)
      toast.success('Login successfully')
/*
      setTimeout(function () {
        history.push('/bookingsdetail');
      }, 2000);
*/
    }
  }
  return (
    <>
      <div style={{ backgroundColor: '#E2E2E2', height: '90vh' }}>
        <br />
        <Grid>
          <Paper elevation={10} style={{ padding: 20, width: 400, height: '53vh', margin: '20px auto' }}>
            <Grid align='center'>
              <Avatar style={{ backgroundColor: '#4169E1' }}><AccountCircleIcon /></Avatar>
            </Grid>
            <h2 style={{ textAlign: 'center' }}>LOG IN</h2>

            <form method="POST">
              <TextField
                onChange={handleInput}
                name='email'
                value={user.email}
                style={{ width: "350px", margin: "5px" }}
                type="email"
                label="Email"
                variant="outlined"
              />
              <br />
              <TextField
                onChange={handleInput}
                name='password'
                value={user.password}
                style={{ width: "350px", margin: "5px" }}
                type="password"
                label="Password"
                variant="outlined"
              />
              <br />
              <Button
                onClick={loginUser}
                variant="contained"
                color="primary"
                type="submit"
                style={{ width: "350px", margin: "5px" }}
              >
                <Link style={{ color: 'white', textDecoration: 'none' }} to="/">Login</Link>
              </Button>
              <hr />
              <Link href='#'> Forgot password?</Link>
              <Typography>Do you have an account?
                &nbsp;<Link to='/signup'>SignUp</Link>
              </Typography>
            </form>
          </Paper>
        </Grid>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
export default Login;