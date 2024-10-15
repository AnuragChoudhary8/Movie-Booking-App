import React, { useState } from 'react';
import { Box, TextField, Typography, FormLabel, Button, Checkbox } from '@mui/material';
import { addMovie } from '../../api-helpers/Api-helpers';

export const AddMovie = () => {
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        posterUrl: "",
        releaseDate: "",
        featured: false,
    });

    const [actors, setActors] = useState([]);
    const [actorInput, setActorInput] = useState("");

    const handleChange = (e) => {
        setInputs((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted', { ...inputs, actors });
        
        addMovie({ ...inputs, actors })
        .then((res) => {
            console.log("Response:", res);
        })
        .catch((err) => console.log("Error:", err));
    };
    

    const labelProps = {
        mt: 1,
        mb: 1
    };

    const addActor = () => {
        if (actorInput.trim()) {
            setActors((prevActors) => [...prevActors, actorInput]);
            setActorInput("");
        }
    };

    return (
        <div>
            <Box width={"100%"} height={"100%"} marginTop={2} margin={"auto"} bgcolor={"#e3f2fd"}>
            <form onSubmit={handleSubmit}>
                <Box
                    width={"50%"}
                    padding={10}
                    margin="auto"
                    display={"flex"}
                    flexDirection={"column"}
                    boxShadow={"10px 10px 20px #ccc"}
                    bgcolor={"white"}

                >
                    <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
                        Add New Movie
                    </Typography>

                    <FormLabel sx={labelProps}>Title</FormLabel>
                    <TextField
                        name="title"
                        variant="standard"
                        margin='normal'
                        value={inputs.title}
                        onChange={handleChange}
                    />

                    <FormLabel sx={labelProps}>Description</FormLabel>
                    <TextField
                        name="description"
                        variant="standard"
                        margin='normal'
                        value={inputs.description}
                        onChange={handleChange}
                    />

                    <FormLabel sx={labelProps}>Poster Url</FormLabel>
                    <TextField
                        name="posterUrl"
                        variant="standard"
                        margin='normal'
                        value={inputs.posterUrl}
                        onChange={handleChange}
                    />

                    <FormLabel sx={labelProps}>Release Date</FormLabel>
                    <TextField
                        name="releaseDate"
                        variant="standard"
                        margin='normal'
                        type="date"
                        value={inputs.releaseDate}
                        onChange={handleChange}
                    />

                    <FormLabel sx={labelProps}>Actors</FormLabel>
                    <Box display={"flex"} alignItems={"center"}>
                        <TextField
                            value={actorInput}
                            onChange={(e) => setActorInput(e.target.value)}
                            variant="standard"
                            margin='normal'
                        />
                        <Button
                            type="button"
                            onClick={addActor}
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: '10px' }}
                        >
                            Add
                        </Button>
                    </Box>

                    <FormLabel sx={labelProps}>Featured</FormLabel>
                    <Checkbox 
                        name='featured' 
                        checked={inputs.featured} 
                        onChange={(e) => setInputs((prevState) => ({ ...prevState, featured: e.target.checked }))} 
                        sx={{ mr: "auto" }}
                    />

                    <Button 
                        type='submit' 
                        variant='contained' 
                        sx={{ width: "30%", margin: "auto", bgcolor: "#2b2d42", ":hover": { bgcolor: "#121217" } }} 
                    >
                        Add New Movie
                    </Button>
                </Box>
            </form>
            </Box>
        </div>
    );
};