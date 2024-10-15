import React, { useEffect, useState } from 'react';
import { MoviesItem } from './MovieItem';
import { Typography, Box } from '@mui/material';
import { getmovie } from '../../api-helpers/Api-helpers';

export const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getmovie()
      .then((data) => {
        console.log("Movies Data:", data); // Check the fetched data here
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
      <Box margin={"auto"} marginTop={4}>
        <Typography sx={{ textDecoration: "#ffd740" }} variant='h4' padding={2} textAlign={"center"}>
          All Movies
        </Typography>
      </Box>

      <Box display={"flex"} width={"80%"} margin={"auto"} justifyContent={"center"} flexWrap={"wrap"}>
        {movies && movies.map((movie, index) => (
          <MoviesItem 
            id={movie._id} 
            title={movie.title} 
            posterUrl={movie.posterUrl} 
            description={movie.description}
            key={index} 
          />
        ))}
      </Box>
    </div>
  );
};
