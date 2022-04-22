import React, { useEffect, useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Popup from 'reactjs-popup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import { Dialog, DialogActions, DialogTitle, Button ,Paper} from '@mui/material';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { format } from 'date-fns';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//
import UpdateDialog from "./EditBooking";

const AllBookings = () => {
    //Edit Booking Dialog
    const [editopen, setEditOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState();

    //popup updatebooking form handleinput
    const [item, setItem] = useState({
        name: '', model: '', perdayrent: '', phone: '', fromdate: '', todate: ''
    });

    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setItem({ ...item, [name]: value });
    }

    const handleEditClickOpen = (value) => {
        setEditOpen(true);
        //console.log('booking ki value ' + value)
        setSelectedValue(value)
        //populating updateform
        setItem(value)
    };

    const handleEditClose = (value) => {
        setEditOpen(false);
        fetchData()
    };

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

    //get bookings data
    const [bookings, setUsers] = useState([])
    const fetchData = async () => {
        const response = await fetch(`http://localhost:5000/allbookings/?page=${pageNumber}`);
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
            <div style={{ height: '85vh' }}>
                {/* Page# header <h5 style={{textAlign:'center'}}>PAGE # {pageNumber + 1}</h5> */}
                <Paper elevation={2}>
                <h1 style={{textAlign:'center'}} >All Bookings</h1>
                <table class="table table-bordered">
                    <thead style={{ backgroundColor: '#677381', color: 'white' }}>
                        <tr>
                            <th scope="col">CarName</th>
                            <th scope="col">CarModel</th>
                            <th scope="col">Phone</th>
                            <th scope="col">PerDayRent</th>
                            <th scope="col">FromDate</th>
                            <th scope="col">ToDate</th>
                            <th scope="col">TotalRent</th>
                            <th scope="col">Operations</th>
                        </tr>
                    </thead>
                    {
                        bookings.map((booking) => (
                            <tbody>
                                <tr key={booking._id}>
                                    <td >{booking.name}</td>
                                    <td >{booking.model}</td>
                                    <td >{booking.phone}</td>
                                    <td >{booking.perdayrent}</td>
                                    <td >{format(new Date(booking.fromdate), "MMMM do, yyyy ")}</td>
                                    <td >{format(new Date(booking.todate), "MMMM do, yyyy ")}</td>
                                    <td >{diffDays(new Date(booking.fromdate), new Date(booking.todate)) * (booking.perdayrent)}</td>
                                    <td>
                                        <Link onClick={() => handleEditClickOpen(booking)} style={{ color: 'black' }}><EditIcon /></Link>
                                        &nbsp;
                                        <Link style={{ color: 'red' }} onClick={handleClickOpen}>
                                            <DeleteIcon/>
                                        </Link>
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
                                                <Button onClick={() => deleteUser(booking._id)} style={{ color: 'red' }} autoFocus>Agree</Button>
                                            </DialogActions>
                                        </Dialog>
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    }
                </table>
                </Paper>
                
            </div>
                            {/* Pagination Controller*/}
                            <div style={{ textAlign: 'center' }}>
                    {/* Pagination <Button style={{ backgroundColor: '#4169E1' }} variant="contained" size="small" onClick={gotoPrevious}><NavigateBeforeRoundedIcon /></Button> */}
                    <Link onClick={gotoPrevious}><NavigateBeforeRoundedIcon /></Link>
                    &nbsp;
                    {pages.map((pageIndex) => (
                        <Button size="small" variant="outlined" style={{ color: 'black', backgroundColor: '#DADDE2', borderRadius: '50%', fontWeight: 'bold', margin: '2px' }} key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                            {pageIndex + 1}
                        </Button>
                    ))}
                    &nbsp;
                    {/* Pagination  <Button style={{ backgroundColor: '#4169E1' }} variant="contained" size="small" onClick={gotoNext}><NavigateNextRoundedIcon /></Button> */}
                    <Link onClick={gotoNext}><NavigateNextRoundedIcon /></Link>
                    {/* Pagination Controller*/}
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
            <UpdateDialog
                selectedValue={selectedValue}
                open={editopen}
                onClose={handleEditClose}
                item={item}
                handleInput={handleInput}
            />
        </>
    );
}

export default AllBookings;