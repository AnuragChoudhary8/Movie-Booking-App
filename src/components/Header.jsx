import React, { useEffect, useState } from 'react'
import {AppBar ,Toolbar ,Box ,Autocomplete ,TextField , Tab ,Tabs ,IconButton} from "@mui/material"
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import { getmovie } from '../api-helpers/Api-helpers.jsx';
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userActions, adminActions } from "../store/index.jsx";


const Header = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = (isAdmin)=>{
    dispatch(isAdmin?adminActions.logout():userActions.logout());
  }

  // Correct property access
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn); 
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn); 

  const [value ,setValue] = useState(0);
  const [movie, setMovies] = useState([]);
  const[selectedMovie , setselectedMovie] = useState([]);

useEffect(() => {
    getmovie()
        .then((data) => {
            if (data && data.movie) {
                setMovies(data.movie);
            } else {
                console.log("No movies data available");
            }
        })
        .catch((error) => console.log(error));
}, []);


// const handleChange = (e ,val) => {
//   setselectedMovie(val);
//   const movie = movie.find((m) =>m.title === val);

//   if(isUserLoggedIn && movie)
//   {
//     Navigate(`/booking/${movie._id}`);
//   }
// }
 


  return (
    <div>
        <AppBar  position='sticky' sx={{bgcolor : "#455a64"}}>
          <Toolbar>
          <Box width ={"20%"}>
          <IconButton LinkComponent={Link} to="/">
          <MovieFilterOutlinedIcon ></MovieFilterOutlinedIcon>
          </IconButton>
          </Box>
          <Box width={"30%" } margin={"auto"}>
          <Autocomplete
        // onChange={handleChange}
        freeSolo
        options={movie && movie.map((option) => option.title)}
        renderInput={(params) => 
        <TextField sx={{input:{color : "white"}}}
          variant='standard' {...params} placeholder ="Search Movies" />}
      />
          </Box>
          <Box display={"flex"}>
            <Tabs 
            textColor='inherit'
            indicatorColor='#'
            value={value} onChange={(e,val)=>setValue(val)}>
              <Tab LinkComponent={Link} to="/movies" label ="Movies"></Tab>
              {
                !isAdminLoggedIn && !isUserLoggedIn && (<>
                <Tab LinkComponent={Link} to="/admin"  label ="Admin"></Tab>
                <Tab LinkComponent={Link} to="/auth"  label ="Auth"></Tab>
                </>)
              }
              {
                isUserLoggedIn && (
                  <>
                <Tab LinkComponent={Link} to="/user"  label ="Profile"></Tab>
                <Tab onClick={()=>logout(false)} LinkComponent={Link} to="/"  label ="Logout"></Tab>
                </>
                )
              }

{
                isAdminLoggedIn && (
                  <>
                <Tab LinkComponent={Link} to="/add"  label ="Add Movie"></Tab>
                <Tab LinkComponent={Link} to="/user-admin"  label ="Profile"></Tab>
                <Tab onClick={()=>logout(true)}LinkComponent={Link} to="/"  label ="Logout"></Tab>
                </>
                )
              }
            </Tabs>
          </Box>
          </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header;
