import React, { useEffect, useState } from 'react';
import { deleteBooking, getUserBooking, getUserDetails } from '../../api-helpers/Api-helpers';
import { Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const Userprofile = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState({}); // Changed to an object instead of an array

    useEffect(() => {
        getUserBooking()
            .then((res) => {
                console.log("Fetched Bookings Response:", res);
                setBookings(res?.bookings || []);
            })
            .catch((err) => console.log("Error fetching bookings:", err));

        getUserDetails()
            .then((res) => {
                setUser(res.user);
                console.log("Fetched User Details:", res.user);
            });
    }, []);

    const handleDelete = (id) => {
        deleteBooking(id)
            .then((res) => { console.log(res) })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <Box width={"100%"} display="flex">
                {user && user.name ? ( 
                    <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    width="30%"
                  >
                    <AccountCircleIcon sx={{ fontSize: "15rem", textAlign: "center" }} />
                    <Typography
                      padding={1}
                      width="350px"
                      height="20px"
                      textAlign="center"
                      border="1px solid #ccc"
                      borderRadius={6}
                      marginTop={5}
                    >
                      Name: {user.name}
                    </Typography>
                    <Typography
                      padding={1}
                      width="350px"
                      height="20px"
                      textAlign="center"
                      border="1px solid #ccc"
                      borderRadius={6}
                      marginTop={5}
                    >
                      Email: {user.email}
                    </Typography>
                  </Box>
                  
                ) : (
                    <Box flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"30%"}>
                        <AccountCircleIcon sx={{ fontSize: "10rem" }} />
                        <Typography padding={1} width={"auto"} textAlign={"center"}>
                            No user details found
                        </Typography>
                    </Box>
                )}

                {bookings.length > 0 && (
                    <Box width={"70%"} display="flex" flexDirection={"column"}>
                        <Typography variant='h3' fontFamily={'verdana'} textAlign={"center"} padding={2}>
                            Bookings
                        </Typography>

                        <Box margin={"auto"} display={"flex"} flexDirection={"column"} width={"80%"}>
                            <List>
                                {bookings.map((booking, index) => (
                                    <ListItem key={index} sx={{ bgcolor: "#00d386", color: "white", textAlign: "center", margin: 3 }}>
                                        <ListItemText sx={{ margin: 3, width: "auto", textAlign: "left" }}>
                                            Movie: {booking.movie ? booking.movie.title : "No movie title available"}
                                        </ListItemText>
                                        <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>
                                            Seat: {booking.seatNumber}
                                        </ListItemText>
                                        <ListItemText sx={{ margin: 1, width: "auto", textAlign: "left" }}>
                                            Date: {new Date(booking.date).toDateString()}
                                        </ListItemText>
                                        <IconButton onClick={() => handleDelete(booking._id)}>
                                            <DeleteForeverIcon color={"error"} />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                )}
            </Box>
        </div>
    );
};
