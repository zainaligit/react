import React, { useEffect, useState } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Popup from 'reactjs-popup';
import EditIcon from '@mui/icons-material/Edit';
import BookIcon from '@mui/icons-material/Book';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import { Dialog, DialogActions, DialogTitle, Button, TextField, Card, CardContent } from '@mui/material';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllClients = () => {
    //confirm del dialog
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
		name: '', email: '', phone: '', adress: '', state: '', city: ''
	});

	let name, value;
	const handleInput = (e) => {
		name = e.target.name;
		value = e.target.value;
		setItem({ ...item, [name]: value });
	}

	//update client
	const updateUser = async (id) => {
		//    alert('data updated for' + id)
		const { name, email, phone, adress, state, city } = item;
		if (!name || !email || !phone || !adress || !state || !city) {
			alert(' empty data')
		}
		else {
			await fetch(`http://localhost:5000/clients/update/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: name, email: email, phone: phone, adress: adress, state: state, city: city })
			});
		}
		fetchData();
	}

	//delete client
	const deleteUser = async (id) => {
		try {
			//alert(id)
			const res = await fetch(`http://localhost:5000/clients/delete/${id}`, {
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


	//get clients data
	const [clients, setUsers] = useState([])
	const fetchData = async () => {
		const response = await fetch(`http://localhost:5000/allclients/?page=${pageNumber}`);
		const { totalPages, clients } = await response.json();
		setUsers(clients)
		setNumberOfPages(totalPages);
		console.log('data agya');
		console.log(totalPages, clients)
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
						
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Phone</th>
							<th scope="col">Adress</th>
							<th scope="col">State</th>
							<th scope="col">City</th>
							<th scope="col">Update / Delete</th>

						</tr>
					</thead>
					{
						clients.map((client, count) => (
							<tbody>
								<tr key={client._id}>
								
									<td >{client.name}</td>
									<td >{client.email}</td>
									<td >{client.phone}</td>
									<td >{client.adress}</td>
									<td >{client.state}</td>
									<td >{client.city}</td>
									<td>
										<Popup trigger={
											<Button style={{ backgroundColor: '#4169E1', color: '#FFFFFF' }} variant="contained" ><EditIcon /></Button>
										}
											onOpen={() => setItem(client)}
											position="right">
											<div>
												<Card style={{ backgroundColor: '#F2ECFF' }} variant="outlined" sx={{ minWidth: 275 }}>
													<CardContent>
														<form method="PUT" onSubmit={(e) => {
															e.preventDefault();
															updateUser(client._id);
														}}>
															<div class="mb-3">
																<TextField
																	autoFocus margin="dense"
																	variant="standard"
																	placeholder="Name"
																	type="text"
																	onChange={handleInput}
																	name='name'
																	defaultValue={client.name}
																	class="form-control" >

																</TextField>
															</div>
															<div class="mb-3">
																<TextField autoFocus margin="dense"
																	variant="standard"
																	placeholder="Email"
																	type="email"
																	name='email'
																	onChange={handleInput}
																	defaultValue={client.email}
																	class="form-control" >
																</TextField>
															</div>
															<div class="mb-3">
																<TextField autoFocus margin="dense"
																	variant="standard"
																	placeholder="Phone"
																	type="number"
																	name='phone'
																	onChange={handleInput}
																	defaultValue={client.phone}
																	class="form-control"
																	aria-describedby="emailHelp" >

																</TextField>
															</div>
															<div class="mb-3">
																<TextField autoFocus margin="dense"
																	variant="standard"
																	placeholder="Adress"
																	type="text"
																	name='adress'
																	onChange={handleInput}
																	defaultValue={client.adress}
																	class="form-control"  >

																</TextField>
															</div>
															<div class="mb-3">
																<TextField autoFocus margin="dense"
																	variant="standard"
																	placeholder="State"
																	type="text"
																	name='state'
																	onChange={handleInput}
																	defaultValue={client.state}
																	class="form-control" >

																</TextField>
															</div>
															<div class="mb-3">
																<TextField autoFocus margin="dense"
																	variant="standard"
																	placeholder="City"
																	type="text"
																	name='city'
																	onChange={handleInput}
																	defaultValue={client.city}
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
                                                <Button onClick={()=>deleteUser(client._id)} style={{ color: 'red' }} autoFocus>Agree</Button>
                                            </DialogActions>
                                        </Dialog>
										&nbsp;
										<Button

											variant="outlined" startIcon={<BookIcon />}
										>
											<Link style={{ textDecoration: 'none' }} to={`/bookings/${client._id}`}>Booking</Link>
										</Button>
										&nbsp;
										<Button
											variant="outlined" startIcon={<VisibilityIcon />}
										>
											<Link style={{ textDecoration: 'none' }} to={`/bookings-detail/${client._id}`}>View-Bookings</Link>
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

export default AllClients;