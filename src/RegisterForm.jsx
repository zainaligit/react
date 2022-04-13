import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Snackbar, MuiAlert, Stack, Link, Grid, Paper, Button, TextField, Card, CardContent, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const history = useHistory()

    const [user, setUser] = useState({
        firstname: '', lastname: '', email: '', password: '', cpassword: ''
    });

    let name, value;
    const handleInput = (e) => {

        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const postData = async (e) => {
        e.preventDefault();
        const { firstname, lastname, email, password, cpassword } = user;
        if (!firstname || !lastname || !email || !password || !cpassword) {
            toast.error('fill the fields properly');
        }
        else if (user.password !== user.cpassword) {
            toast.error('password are not matching')
        }
        else {
            await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstname: firstname, lastname: lastname, email: email, password: password, cpassword: cpassword })
            });
            toast.success('Signin successfully')
            setTimeout(function () {
                history.push('/login')
            }, 2000);
        }
    }

    return (
        <>
            <div style={{ backgroundColor: '#E2E2E2', height: '90vh' }}>
                <br />
                <Grid>
                    <Paper elevation={10} style={{ padding: 20, width: 400, height: '76vh', margin: '20px auto' }}>
                        <Grid align='center'>
                            <Avatar style={{ backgroundColor: '#4169E1' }}><AccountCircleIcon /></Avatar>
                        </Grid>
                        <h2 style={{ textAlign: 'center' }}>SIGN UP</h2>
                        <form method="POST">
                            <TextField
                                onChange={handleInput}
                                name='firstname'
                                value={user.firstname}
                                style={{ width: "350px", margin: "5px" }}
                                type="text"
                                label="FirstName"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                onChange={handleInput}
                                name='lastname'
                                value={user.lastname}
                                style={{ width: "350px", margin: "5px" }}
                                type="text"
                                label="LastName"
                                variant="outlined"
                            />
                            <br />
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
                            <TextField
                                onChange={handleInput}
                                name='cpassword'
                                value={user.cpassword}
                                style={{ width: "350px", margin: "5px" }}
                                type="password"
                                label="ConfirmPassword"
                                variant="outlined"
                            />
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                onClick={postData}
                                style={{ width: "350px", margin: "5px" }}
                            >
                                sign up
                            </Button>
                            <hr />
                            <Typography>Do you have an account?
                                &nbsp;<Link href='#'>LogIn</Link>
                            </Typography>
                        </form>
                    </Paper>
                </Grid>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
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
export default Register;