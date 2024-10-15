import axios from 'axios';

export const getmovie = async () => {
    try {
        const res = await axios.get("/movie");
        console.log("Fetched data:", res.data); // Log the full response
        if (res.status === 200) {
            return res.data;
        } else {
            console.log("Error fetching movies, status:", res.status);
            return null;
        }
    } catch (error) {
        console.error("Error in getmovie:", error);
        return null;
    }
};



export const sendUserAuthRequest = async(data , signup) => {
    const res = await axios.post(`/user/${signup ? 'signup' : 'login'}`,
        {name: signup ? data.name : "",
        email : data.email,
        password : data.password
    }).catch((error)=>console.log(error));

    if(res.status === 200  || res.status ===201)
    {
        const resData = await res.data;
        return resData ;
    }
    else{
        console.log("unexpected error occured",res.status)
    }
   
};


export const sendAdminAuthRequest =async(data)=>{
    const res = await axios.post("/admin/login",
        {
            email: data.email,
            password: data.password
        }
    ).catch((error)=>console.log(error));

    if(res.status === 200 || res.status ===201)
    {
        const resData = await res.data;
        return resData;
    }
    else{
        console.log("unexpected error occured",res.status)
    }
}




export const getMovieDetails = async (id) => {
  try {
    const res = await axios.get(`/movie/${id}`);
    if (res.status !== 200 || !res.data.movie) {
      console.log("Unexpected error or movie data missing");
      return null;
    }
    console.log("Movie data received:", res.data.movie);
    return res.data.movie; 
  } catch (error) {
    console.log("Error fetching movie details:", error);
    return null;
  }
};


export const newBooking = async(data)=>{
    const res =await axios.post('/booking',{
        movie : data.movie,
        seatNumber : data.seatNumber,
        date : data.date,
        user : localStorage.getItem("userId")
    })
    .catch(error=>{
        console.log(error);
    })
    if(res.status !== 200)
    {
        console.log("unexpected error occurred: " + res.status)
    }

    const resData = res.data;
    return resData;
}


export const getUserBooking = async () => {
    const id = localStorage.getItem("userId");
    console.log("Retrieved User ID:", id);


    try {
        const res = await axios.get(`/user/booking/${id}`);

        if (res.status !== 200) {
            console.log("Unexpected error occurred");
            return null; 
        }

        return res.data;
    } catch (err) {
        console.error("Error fetching user bookings:", err);
        return null; 
    }
}


export const deleteBooking = async(id)=>{
  const res = await axios.delete(`/booking/${id}`)
    .catch(err=>console.log(err));

    if(res.status !== 200) {
        return console.log("unexpected error occurred");
    }

    const resData = await res.data;
    return resData;
}



export const getUserDetails =async()=>{
    const id = localStorage.getItem("userId");
    const res = await axios.get(`/user/${id}`)
    .catch(err=>console.log(err));

    if(res.status !== 200)
    {
        return console.log("unexpected error occured");
    }
    const resData = await res.data;
    return resData;
}


export const addMovie = async (data) => {
    const res = await axios.post(
        "/movie",
        {
            title: data.title,
            description: data.description,
            releaseDate: data.releaseDate,
            posterUrl: data.posterUrl,  // Make sure casing is correct here
            featured: data.featured,
            actors: data.actors,
            admin: localStorage.getItem("adminId"),
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
        }
    ).catch((err) => console.log(err));

    if (res && res.status === 200) {
        const resData = res.data;
        return resData;
    } else {
        console.log("Unexpected Error Occurred");
    }
};



export const getAdminById = async()=>{
    const adminId = localStorage.getItem("adminId");    
    const res=  await axios.get(`/admin/${adminId}`)
    .catch((err)=>{console.log(err)});

    if(res.status !== 200)
    {
        return console.log("unexpexted error occured")
    }
    const resData = await res.data;
    console.log("resData : ", resData);
    return resData;
}