import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user-routes.js';
import adminRouter from './routes/admin-routes.js';
import movieRouter from './routes/movie-routes.js';
import bookingRouter from './routes/booking-route.js';
import connectDB from './config/database.js';
const app = express();
dotenv.config();

app.use(cors()); // Allow all origins for development



// middleware
app.use(express.json());
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/movie",movieRouter);
app.use("/booking",bookingRouter);

// DATABASE
connectDB();
app.use("/",(req , res,next)=>{
    res.send("Website is live")
})

// SERVER
app.listen(process.env.PORT ||4000 , ()=>{
    console.log(`Server is Running at ${process.env.PORT ||4000}`)
})