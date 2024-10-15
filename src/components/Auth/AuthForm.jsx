import {Box,IconButton , Dialog, FormLabel, TextField, Typography , Button} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react'
import {Link} from "react-router-dom"

export const AuthForm = ({onSubmit , isAdmin}) => {
    
    const[isSignup , setIsSignup] = useState(false);

    const[inputs , setInputs] = useState(
        {name :"",
        email :"",
        password :"",
        }
    );const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log( inputs )
        onSubmit({inputs , signup:isAdmin ? false : isSignup})
    }


  return (
    <div>
        <Dialog PaperProps={{style:{borderRadius:"10px"}}}  open={"true"} >
            <Box sx={{ml:"auto",padding:1}}>
        <IconButton LinkComponent={Link} to="/">
            <CloseIcon></CloseIcon>
        </IconButton>
            </Box>
         <Typography variant ="h4" textAlign="center"  >
            {isSignup ? "SignUp" : "Login"}
        </Typography>
        <form onSubmit={handleSubmit} width={"500"}>
            <Box 
            display="flex" 
            justifyContent={"center"} flexDirection="column" 
            width={370} 
            height={380}
            margin={"auto"} 
            alignCenter="center"
            padding={"10px"}>

                {!isAdmin && isSignup&&(<>
                    <FormLabel sx={{marginTop:"20px"}}>Name</FormLabel>
                    <TextField 
                    margin='normal' variant='standard'
                    type={"text"}
                    name={"name"}
                    value={inputs.name}
                    onChange={handleChange} ></TextField>
                </>)}

                <FormLabel sx={{marginTop:"20px"}}>Email</FormLabel>
                <TextField 
                margin='normal' 
                variant='standard' 
                type={"email"} 
                name={"email"}
                value={inputs.email}
                onChange={handleChange}>
                </TextField>

                <FormLabel sx={{marginTop:"20px"}}>Password</FormLabel>
                <TextField sx={{paddingLeft:"5px"}} margin='normal'
                variant='standard' 
                type={"password"}
                name={"password"}
                value={inputs.password}
                onChange={handleChange}>
                </TextField>
                
                
                <Button sx={{mt:"5px",mb:"10px", borderRadius :10 , bgcolor:"#455a64"}} variant='contained' type="Submit" fullWidth>
                {isSignup ? "SignUp" : "Login"}
                </Button>

                {!isAdmin&&<Button onClick={()=>setIsSignup(!isSignup)} sx={{mt:"5px",mb:"20px", borderRadius :10}}fullWidth>
                    Switch To {isSignup ? "Login" : "SignUp"}
                </Button>}
            </Box>
        </form>
        </Dialog>
    </div>
  )
}
