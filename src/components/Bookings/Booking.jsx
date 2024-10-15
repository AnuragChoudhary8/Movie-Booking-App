import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieDetails, newBooking } from '../../api-helpers/Api-helpers';
import { Typography , Button , Box, FormLabel, TextField } from '@mui/material';

export const Booking = () => {
    const [movie, setMovie] = useState();
    const [input , setInput] = useState({seatNumber :"" , date:""});

    const id = useParams().id;

    console.log("Movie Id : ", id);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fetching details for movie ID:", id);
        getMovieDetails(id)
          .then((movieData) => {
            if (!movieData) {
              console.log("No movie data received");
              return;
            }
            console.log("Movie Details:", movieData);
            setMovie(movieData);
          })
          .catch((error) => console.log("Error fetching movie details:", error));
      }, [id]);
      
      const handlerChange = (e)=>{
        setInput((prevState)=>(
    {...prevState , [e.target.name]:e.target.value}
        )
        )
      }

      const handlerSubmit =(e)=>{
        e.preventDefault();
        console.log(input);
        newBooking({...input , movie : movie._id})
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
        navigate("/user")
      }
      
    console.log(movie);
    return (
        <Box width={"100%"} height={"100vh"} marginTop={2} margin={"auto"} bgcolor={"#e3f2fd"}>
          <div className='bgcolor={"#e3f2fd"}'>
          {
            !movie ? (
              <Typography padding={3} fontFamily="fantasy" variant="h4" textAlign="center">
                Loading movie details...
              </Typography>
            ) : (
              <Fragment>
                <Typography padding={3} fontFamily="fantasy" variant="h4" textAlign="center">
                  Book Tickets Of Movie: {movie.title}
                </Typography>
                <Box display={"flex"} justifyContent={"center"}>
                  <Box display={"flex"} flexDirection={"column"} paddingTop={3} width={"50%"} marginRight={"auto"}>
                    <img width={"80%"} height={"300px"} src={movie.posterUrl} alt={movie.title} />
                    <Box width={"80%"} marginTop={3} padding={2}>
                      <Typography paddingTop={2}>{movie.description}</Typography>
                      <Typography fontWeight={"bold"}>
                        starrrer :
                        {movie.actors.map((actor)=>" "+actor +" ")}
                      </Typography>
                      <Typography fontWeight={"bold"} marginTop={1}>
                Release Date :{ new Date(movie.releaseDate).toDateString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Box width={"50%"} paddingTop={3}>
                <form onSubmit={handlerSubmit}>
                    <Box padding={5} margin={"auto"}
                    display={"flex"} flexDirection={"column"}>
                        <FormLabel  sx={{margintop:"10px"}}>Seat Number</FormLabel>
                        <TextField
                        value={input.seatNumber}
                        onChange={handlerChange}
                        name='seatNumber' 
                        type={"number"}
                         margin='normal' variant='standard'></TextField>

                        <FormLabel sx={{margintop:"20px"}}>Booking Date</FormLabel>
                        <TextField
                        value={input.date}
                        onChange={handlerChange}
                        name='date'
                         type={"date"} margin='normal' variant='standard'></TextField>
                        
                        <Button type="submit"
                        sx={{mt:3}}>
                            Book Now
                        </Button>
                    </Box>
                </form>
                  </Box>
                </Box>
              </Fragment>
            )
          }
        </div>
        </Box>
      );
    }      