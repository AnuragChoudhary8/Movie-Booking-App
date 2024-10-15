import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { MoviesItem } from './Movies/MovieItem'
import { getmovie } from '../api-helpers/Api-helpers.jsx'
import { useEffect, useState } from 'react'
import{Link} from "react-router-dom"
import { GlowingBox } from './Movies/GlowingBox.jsx'
export const Homepage = () => {

    const [movie, setMovies] = useState([]);

    useEffect(() => {
        getmovie()
            .then((data) => {
                if (data && data.movie) {
                    setMovies(data.movie); 
                } else {
                    console.log("No movies data available", data);
                }
            })
            .catch((error) => console.error("Error fetching movies:", error)); 
    }, []);
    


    return (
        <div>
            <Box width={"100%"} height={"100%"} marginTop={2} margin={"auto"} bgcolor={"#e3f2fd"}>
            <Box marginLeft={"-5%"} padding={2}>
            <GlowingBox/>
            </Box>

                <Box padding={2} margin={"auto"}>
                    <Typography variant='h4' textAlign={"center"}>Latest Releases</Typography>
                </Box>
                <Box display={"flex"} width={"80%"} margin={"auto"} justifyContent={"center"} flexWrap={"wrap"} >
                    {movie && movie.slice(0,4).map((movie, index) => (<MoviesItem 
                    id={movie._id} 
                    title={movie.title} 
                    posterUrl={movie.posterUrl}
                    releaseDate={movie.releaseDate} 
                    description={movie.description}
                    key={index} />))}
                </Box>
                <Box display={"flex"} padding={5} margin={"auto"} justifyContent="center">
                    <Button LinkComponent={Link} to="/movies" label ="Movies"  variant='outlined' color='#2b2d42'>View More</Button>
                    
                </Box>
            </Box>
        </div>
    )
}
