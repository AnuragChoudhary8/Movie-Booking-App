import React, { useEffect, useState } from 'react';
import { getAdminById } from '../../api-helpers/Api-helpers';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Adminprofile = () => {
    const [admin, setAdmin] = useState(null); // Initialize admin as null
    const [loading, setLoading] = useState(true); // Add a loading state

    useEffect(() => {
        getAdminById()
            .then((res) => {
                setAdmin(res.admin); // Set the admin state
                console.log("Fetched User Details:", res.admin);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when done
            });
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>; // Loading indicator
    }

    return (
        <div>
            <Box width={"100%"} display="flex">
                {admin ? ( // Check if admin exists
                    <Box
                        flexDirection={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        width={"30%"}
                    >
                        <AccountCircleIcon sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }} />
                        <Typography
                            padding={1}
                            width={"auto"}
                            textAlign={"center"}
                            border={"1px solid #ccc"}
                            borderRadius={6}
                        >
                            Email: {admin.email}
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        flexDirection={"column"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        width={"30%"}
                    >
                        <AccountCircleIcon sx={{ fontSize: "10rem" }} />
                        <Typography padding={1} width={"auto"} textAlign={"center"}>
                            No user details found
                        </Typography>
                    </Box>
                )}

                {admin && admin.addedMovies && admin.addedMovies.length > 0 ? ( // Check if addedMovies exists and has length
                    <Box width={"70%"} display="flex" flexDirection={"column"}>
                        <Typography
                            variant='h3'
                            fontFamily={'verdana'}
                            textAlign={"center"}
                            padding={2}
                        >
                            Added Movies
                        </Typography>

                        <Box margin={"auto"} display={"flex"} flexDirection={"column"} width={"80%"}>
                            <List>
                                {admin.addedMovies.map((movie, index) => (
                                    <ListItem
                                        key={index}
                                        sx={{ bgcolor: "#00d386", color: "white", textAlign: "center", margin: 3 }}
                                    >
                                        <ListItemText sx={{ margin: 3, width: "auto", textAlign: "left" }}>
                                            Movie: {movie ? movie.title : "No movie title available"}
                                        </ListItemText>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                ) : (
                    <Typography textAlign="center">No movies found</Typography>
                )}
            </Box>
        </div>
    );
};
