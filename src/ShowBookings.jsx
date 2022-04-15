import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Popup from 'reactjs-popup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import BookIcon from '@mui/icons-material/Book';
import MenuIcon from '@mui/icons-material/Menu';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Card, CardContent, AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { format } from 'date-fns';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingsDetail = () => {
    //confirm del dialog
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /*
var date1 = new Date("2016-01-04 10:34:23");
var formattedDate1 = format(date1, "MMMM do, yyyy H:mma");
//calculating no of days between two dated
const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
const total = diffDays(new Date('2016-01-04 10:34:23'), new Date('2016-01-10 10:34:23'));
console.log(total);
*/
const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));

    //pagination
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
    };
    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
    };

    //popup form handleinput
    const [item, setItem] = useState({
        firstname: '', lastname: '', email: '', password: '', cpassword: ''
    });

    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setItem({ ...item, [name]: value });
    }

    //update booking
    const updateUser = async (id) => {
        //    alert('data updated for' + id)
        const { name, model, phone, perdayrent, fromdate, todate } = item;
        if (!name || !model || !phone || !perdayrent || !fromdate || !todate) {
            alert('empty data')
        }
        else {
            await fetch(`http://localhost:5000/bookings/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, model: model, phone: phone, perdayrent: perdayrent, fromdate: fromdate, todate: todate })
            });
        }
        fetchData();
    }


    //delete booking
    const deleteUser = async (id) => {
        try {
            //alert(id)
            const res = await fetch(`http://localhost:5000/bookings/delete/${id}`, {
                method: 'DELETE'
            })
            const data = await res.json();
            console.log(data);
            handleClose();
            toast.success('Successfully deleted')
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }

    const id = useParams()
    console.log(id.id)

    //get bookings data
    const [bookings, setUsers] = useState([])
    const fetchData = async () => {
        let clientId = id.id;
        const response = await fetch(`http://localhost:5000/bookings/${clientId}/?page=${pageNumber}`);
        const { totalPages, bookings } = await response.json();
        setUsers(bookings)
        setNumberOfPages(totalPages);
        console.log('data');
        console.log(totalPages, bookings)
    }
    useEffect(() => {
        fetchData();
    }, [pageNumber])


    return (

        <>
            <div style={{ backgroundColor: '#E2E2E2', height: '90vh' }}>
                {/* Page# header <h5 style={{textAlign:'center'}}>PAGE # {pageNumber + 1}</h5> */}
                <table class="table table-bordered">
                    <thead style={{ backgroundColor: '#677381', color: 'white' }}>
                        <tr>
                           
                            <th scope="col">ClientName</th>
                            <th scope="col">Email</th>
                            <th scope="col">CarName</th>
                            <th scope="col">Model</th>
                            <th scope="col">Phone</th>
                            <th scope="col">PerDayRent</th>
                            <th scope="col">FromDate</th>
                            <th scope="col">ToDate</th>
                            <th scope="col">TotalRent</th>
                            <th scope="col">Update / Delete</th>
                        </tr>
                    </thead>
                    {
                        bookings.map((booking, count) => (
                            <tbody>
                                <tr key={booking._id}>
                                    
                                    <td >{booking.clientsId.name}</td>
                                    <td >{booking.clientsId.email}</td>
                                    <td >{booking.name}</td>
                                    <td >{booking.model}</td>
                                    <td >{booking.phone}</td>
                                    <td >{booking.perdayrent}</td>
                                    <td >{format(new Date(booking.fromdate), "MMMM do, yyyy ")}</td>
                                    <td >{format(new Date(booking.todate), "MMMM do, yyyy ")}</td>
                                    <td >{diffDays(new Date(booking.fromdate), new Date(booking.todate))*(booking.perdayrent)}</td>
                                    <td>
                                        <Popup trigger={
                                            <Button style={{ backgroundColor: '#4169E1', color: '#FFFFFF' }} variant="contained" ><EditIcon /></Button>
                                        }
                                            onOpen={() => setItem(booking)}
                                            position="right">
                                            <div>
                                                <Card style={{ backgroundColor: '#F2ECFF' }} variant="outlined" sx={{ minWidth: 275 }}>
                                                    <CardContent>
                                                        <form method="PUT" onSubmit={(e) => {
                                                            e.preventDefault();
                                                            updateUser(booking._id);
                                                        }}>
                                                            <div class="mb-3">
                                                                <TextField
                                                                    autoFocus margin="dense"
                                                                    variant="standard"
                                                                    placeholder="Name"
                                                                    type="text"
                                                                    onChange={handleInput}
                                                                    name='name'
                                                                    defaultValue={booking.name}
                                                                    class="form-control" >

                                                                </TextField>
                                                            </div>
                                                            <div class="mb-3">
                                                                <TextField autoFocus margin="dense"
                                                                    variant="standard"
                                                                    placeholder="Model"
                                                                    type="text"
                                                                    name='model'
                                                                    onChange={handleInput}
                                                                    defaultValue={booking.model}
                                                                    class="form-control" >

                                                                </TextField>
                                                            </div>
                                                            <div class="mb-3">
                                                                <TextField autoFocus margin="dense"
                                                                    variant="standard"
                                                                    placeholder="PerDayRent"
                                                                    type="number"
                                                                    name='perdayrent'
                                                                    onChange={handleInput}
                                                                    defaultValue={booking.perdayrent}
                                                                    class="form-control"
                                                                    aria-describedby="emailHelp" >

                                                                </TextField>
                                                            </div>
                                                            <div class="mb-3">
                                                                <TextField autoFocus margin="dense"
                                                                    variant="standard"
                                                                    placeholder="Phone"
                                                                    type="number"
                                                                    name='phone'
                                                                    onChange={handleInput}
                                                                    defaultValue={booking.phone}
                                                                    class="form-control"
                                                                    aria-describedby="emailHelp" >

                                                                </TextField>
                                                            </div>
                                                            <div class="mb-3">
                                                                <TextField autoFocus margin="dense"
                                                                    variant="standard"
                                                                    placeholder="FromDate"
                                                                    type="date"
                                                                    name='fromdate'
                                                                    onChange={handleInput}
                                                                    defaultValue={booking.fromdate}
                                                                    class="form-control"  >

                                                                </TextField>
                                                            </div>
                                                            <div class="mb-3">
                                                                <TextField autoFocus margin="dense"
                                                                    variant="standard"
                                                                    placeholder="ToDate"
                                                                    type="date"
                                                                    name='todate'
                                                                    onChange={handleInput}
                                                                    defaultValue={booking.todate}
                                                                    class="form-control" >

                                                                </TextField>
                                                            </div>
                                                            <Button style={{ backgroundColor: '#4169E1', color: 'white' }} variant="contained" type="submit" class="btn btn-primary" >Update</Button>
                                                        </form>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </Popup>
                                        &nbsp;
										<Button style={{ color: 'red' }} variant="outlined" startIcon={<DeleteIcon style={{ color: 'red' }} />} onClick={handleClickOpen}>
                                            Delete
                                        </Button>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"Do you want to delete this entry?"}
                                            </DialogTitle>
                                            <DialogActions>
                                                <Button onClick={handleClose}>Disagree</Button>
                                                <Button onClick={()=>deleteUser(booking._id)} style={{ color: 'red' }} autoFocus>Agree</Button>
                                            </DialogActions>
                                        </Dialog>

                                        &nbsp;
                                        <Button

                                            variant="outlined" startIcon={<BookIcon />}
                                        >
                                            <Link style={{ textDecoration: 'none' }} to={`/bookings/${id.id}`}>Booking</Link>
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
                
                <br />
                {/* Pagination Controller*/}
                <div style={{ textAlign: 'center' }}>
                    {/* Pagination <Button style={{ backgroundColor: '#4169E1' }} variant="contained" size="small" onClick={gotoPrevious}><NavigateBeforeRoundedIcon /></Button> */}
                    <Link onClick={gotoPrevious}><NavigateBeforeRoundedIcon /></Link>
                    &nbsp;
                    {pages.map((pageIndex) => (
                        <Button size="small" variant="outlined" style={{ color: 'white', backgroundColor: '#677381', borderRadius: 10, fontWeight: 'bold', margin: '2px' }} key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                            {pageIndex + 1}
                        </Button>
                    ))}
                    &nbsp;
                    {/* Pagination  <Button style={{ backgroundColor: '#4169E1' }} variant="contained" size="small" onClick={gotoNext}><NavigateNextRoundedIcon /></Button> */}
                    <Link onClick={gotoNext}><NavigateNextRoundedIcon /></Link>
                    {/* Pagination Controller*/}
                </div>
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

export default BookingsDetail;