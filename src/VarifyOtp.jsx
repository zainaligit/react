import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import jwt_decode from "jwt-decode";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Snackbar, Stack, Grid, Paper, Button, TextField, Card, CardContent, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Otp = () => {
    const [qr, setQr] = useState([])
    const [secret, setSecret] = useState([])
    const [user, setUser] = useState({
        token: '', secretKey:'', userId:''
    });

    const history = useHistory();

    const [quote, setQuote] = useState('')

    async function populateQuote() {
        const res = await fetch('http://localhost:5000/clients-detail', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        })

        const data = await res.json()
        if (data.status === 'ok') {
            setQuote(data.quote)
        } else {
            alert(data.error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            //console.log(token)
            const user = jwt_decode(token)
            console.log(quote)
            populateQuote();
        }
    }, [])


    let name, value;
    const handleInput = (e) => {

        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const fetchData = async () => {
        const response = await fetch(`http://localhost:5000/otp`);
        const data = await response.json();
        setQr(data.qrcode)
        setSecret(data.secret)
        console.log('qrcode = ' + data.qrcode)
        console.log('secret = ' + data.secret)
    }
    useEffect(() => {
        fetchData();
    }, [])

    const verifyOtp = async (e) => {
        e.preventDefault();
        const {token} = user;
        const secretKey = secret;
        const userId = quote;
        const res = await fetch('http://localhost:5000/verifysecret', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token, secretKey: secretKey, userId: userId  })
        });
        const data = await res.json();
        if (!token) {
            toast.error('plzz enter otp')
        } else if(data.error) {
            toast.error(data.error)
        }else{
            toast.success('Otp Verified')
            setTimeout(function () {
                history.push('/')
            }, 1000);
            localStorage.setItem('verified', data)
        }
    }

    return (
        <>
            <div style={{ backgroundColor: '#E2E2E2', height: '90vh' }}>
                <br />
                <Grid>
                    <Paper elevation={10} style={{ padding: 20, width: 400, height: '65vh', margin: '20px auto' }}>
                        <Grid align='center'>
                            <Avatar style={{ backgroundColor: '#4169E1' }}><AccountCircleIcon /></Avatar>
                        </Grid>
                        <h2 style={{ textAlign: 'center' }}>Verification</h2>
                        <form method="POST">
                            <div style={{ textAlign: 'center' }}>
                                <p >&nbsp;&nbsp;Scan qrcode to get OTP</p>
                                <img style={{ width: 120, textAlign: 'center' }}
                                    src={qr}
                                    alt="new"
                                />
                            </div>
                            <TextField
                                name='token'
                                onChange={handleInput}
                                value={user.token}
                                style={{ width: "350px", margin: "5px" }}
                                type="number"
                                label="Enter 6 digit otp"
                                variant="outlined"
                                required
                            />
                            <Button
                            onClick={verifyOtp}
                                variant="contained"
                                color="primary"
                                type="submit"
                                style={{ width: "350px", margin: "5px" }}
                            >
                            Verify
                               {/** <Link style={{ color: 'white', textDecoration: 'none' }} to="/">Verify</Link>*/} 
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
export default Otp;