import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, Grid, Paper, Button, TextField, Avatar, MenuItem } from '@mui/material';
import CarRentalIcon from '@mui/icons-material/CarRental';
import CancelIcon from '@mui/icons-material/Cancel';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Booking = () => {

    const history = useHistory()
    //post booking
    const [booking, setBooking] = useState({
        name: '', model: '', phone: '', perdayrent: '', fromdate: '', todate: '', clientsId: ''
    });

    let name, value;
    const handleInput = (e) => {

        name = e.target.name;
        value = e.target.value;

        setBooking({ ...booking, [name]: value });
        checkValidation();
    }

    //form validation
    const [validation, setValidation] = useState({
        phone: "",
    });
    const checkValidation = () => {
        let errors = validation;

        //phone validation
        var phone = '1234567890';
        if (!booking.phone.match('[0-9]{10}')) {
            errors.phone = 'Please provide valid phone number';
        } else {
            errors.phone = '';
        }

        setValidation(errors);
    };
    /*
    useEffect(() => {
        checkValidation();
    }, [client]);
*/
    //

    //send client id for booking
    const id = useParams()
    console.log(id.id)

    const postData = async (e) => {
        e.preventDefault();
        let clientsId = id.id;
        const { name, model, phone, perdayrent, fromdate, todate } = booking;
        if (!name || !model || !phone || !perdayrent || !fromdate || !todate) {
            toast.error('Fill the fields');
        }
        else {
            await fetch(`http://localhost:5000/bookings/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, model: model, phone: phone, perdayrent: perdayrent, fromdate: fromdate, todate: todate, clientsId: clientsId })
            });
            setBooking('');
            toast.success('Successfully booked')
            setTimeout(function () {
                history.push('/bookingsdetail')
            }, 1000);
        }
    }

    return (
        <>
            <div style={{ backgroundColor: '#E2E2E2', height: '100vh' }}>
                <br />
                <Grid>
                    <Paper elevation={10} style={{ padding: 20, width: 400, height: '94vh', margin: '20px auto' }}>
                    <div style={{textAlign:'right'}} ><Link style={{ color:'red' }} to={`/`}><CancelIcon/></Link></div>
                        <Grid align='center'>
                            <Avatar style={{ backgroundColor: '#4169E1' }}><CarRentalIcon /></Avatar>
                        </Grid>
                        <h2 style={{ textAlign: 'center' }}>CAR BOOKING</h2>
                        <form method="POST">

                            <FormControl style={{ width: "350px", margin: "5px" }}>
                                <InputLabel>CarName</InputLabel>
                                <Select
                                    type="text"
                                    name='name'
                                    value={booking.name}
                                    label="CarName"
                                    onChange={handleInput}
                                >
                                    <MenuItem value='Honda'>Honda</MenuItem>
                                    <MenuItem value='Suzuki'>Suzuki</MenuItem>
                                    <MenuItem value='BMW'>BMW</MenuItem>
                                    <MenuItem value='Ford'>Ford</MenuItem>
                                    <MenuItem value='Toyota'>Toyota</MenuItem>
                                    <MenuItem value='Bugatti'>Bugatti</MenuItem>
                                    <MenuItem value='Kia'>Kia</MenuItem>
                                    <MenuItem value='LandRover'>LandRover</MenuItem>
                                    <MenuItem value='Nissan'>Nissan</MenuItem>
                                    <MenuItem value='Toyota'>Toyota</MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl style={{ width: "350px", margin: "5px" }}>
                                <InputLabel>CarModel</InputLabel>
                                <Select
                                    type="text"
                                    name='model'
                                    value={booking.model}
                                    label="CarModel"
                                    onChange={handleInput}
                                >
                                    <MenuItem value='VX'>VX</MenuItem>
                                    <MenuItem value='VXR'>VXR</MenuItem>
                                    <MenuItem value='VXL'>VXL</MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <TextField
                                onChange={handleInput}
                                name='perdayrent'
                                value={booking.perdayrent}
                                style={{ width: "350px", margin: "5px" }}
                                type="number"
                                label="PerDayRent/PKR"
                                variant="outlined"
                            />
                            <br />
                            <TextField
                                onChange={handleInput}
                                name='phone'
                                value={booking.phone}
                                style={{ width: "350px", margin: "5px" }}
                                type="text"
                                label="Phone"
                                variant="outlined"
                                placeholder="+92---------"
                            />
                            {validation.phone && <p>&nbsp;{validation.phone}</p>}
                            <label style={{ width: "350px", margin: "5px" }}>FromDate</label>
                            <TextField
                                onChange={handleInput}
                                name='fromdate'
                                value={booking.fromdate}
                                style={{ width: "350px", margin: "5px" }}
                                type="date"
                                variant="outlined"
                            />
                            <br />
                            <label style={{ width: "350px", margin: "5px" }}>ToDate</label>
                            <TextField
                                onChange={handleInput}
                                name='todate'
                                value={booking.todate}
                                style={{ width: "350px", margin: "5px" }}
                                type="date"
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
                                BOOK NOW
                            </Button>

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
export default Booking;