import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import { DialogActions } from '@mui/material';
import { FormControl, InputLabel, Select, Paper, Button, TextField, MenuItem } from '@mui/material';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateDialog(props) {

    const { onClose, selectedValue, open, item,handleInput } = props;
    const handleClose = () => {
        onClose();
    };

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
        handleClose();
        toast.success('Updated successfully')
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <div>
                <Paper style={{ width: '400px', padding: '14px' }}>
                    <br />
                    <h3 style={{ textAlign: 'center' }}>Update Booking</h3>
                    <form method="PUT">
                        <FormControl style={{ width: "350px", margin: "5px" }}>
                            <InputLabel>CarName</InputLabel>
                            <Select
                                type="text"
                                name='name'
                                onChange={handleInput}
                                value={item.name}
                                label="CarName"
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
                                onChange={handleInput}
                                value={item.model}
                                label="CarModel"
                            >
                                <MenuItem value='VX'>VX</MenuItem>
                                <MenuItem value='VXR'>VXR</MenuItem>
                                <MenuItem value='VXL'>VXL</MenuItem>
                            </Select>
                        </FormControl>
                        <br />
                        <TextField

                            name='perdayrent'
                            onChange={handleInput}
                            value={item.perdayrent}
                            style={{ width: "350px", margin: "5px" }}
                            type="number"
                            label="PerDayRent/PKR"
                            variant="outlined"
                        />
                        <br />
                        <TextField

                            name='phone'
                            onChange={handleInput}
                            value={item.phone}
                            style={{ width: "350px", margin: "5px" }}
                            type="text"
                            label="Phone"
                            variant="outlined"
                        />
                        <br />
                        <label >&nbsp;FromDate</label>
                        <TextField

                            name='fromdate'
                            onChange={handleInput}
                            value={item.fromdate}
                            style={{ width: "350px", margin: "5px" }}
                            type="date"
                            variant="outlined"
                        />
                        <br />
                        <label >&nbsp;ToDate</label>
                        <TextField

                            name='todate'
                            onChange={handleInput}
                            value={item.todate}
                            style={{ width: "350px", margin: "5px" }}
                            type="date"
                            variant="outlined"
                        />
                        <br />
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                            <Button onClick={() => updateUser(selectedValue._id)} style={{ color: 'green' }} autoFocus>Update</Button>
                        </DialogActions>
                    </form>
                </Paper>
            </div>
        </Dialog>
    );
}
export default UpdateDialog;

UpdateDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    handleInput: PropTypes.func.isRequired,
};

