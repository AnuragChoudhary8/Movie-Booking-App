import mongoose, { mongo } from 'mongoose';
import Bookings from '../models/Bookings.js';
import Movie from '../models/Movie.js';
import User from '../models/User.js';

export const newBooking = async (req, res, next) => {
    try {
        const session = await mongoose.startSession();
        
        const { movie, date, seatNumber, user } = req.body;

        if (!movie || !date || !seatNumber || !user) {
            return res.status(400).json({
                message: "Please provide all the required fields"
            });
        }

        const existingMovie = await Movie.findById(movie);
        const existingUser = await User.findById(user);

        if (!existingMovie) {
            return res.status(404).json({
                message: 'Movie not found'
            });
        }
        if (!existingUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        session.startTransaction();

        const bookMovie = await Bookings.create([{
            movie,
            date: new Date(date),
            seatNumber,
            user,
        }], { session });

        if (!bookMovie) {
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({
                message: "Movie not booked. Try again"
            });
        }

        existingUser.bookings.push(bookMovie[0]._id);
        existingMovie.bookings.push(bookMovie[0]._id);

        await existingMovie.save({ session });
        await existingUser.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: "Movie booked successfully",
            bookMovie: bookMovie
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while booking a movie",
            error: error.message
        });
    }
};


export const getBookingById = async(req ,res ,next)=>{
   try
   {
    const id = req.params.id;
    const getBook = await Bookings.findById(id);
    if(!getBook)
    {
        return res.status(404).json({
            message : "No Bookings found"
        });
    }
    
    return res.status(200).json({
        message : "Bookings fetch successfully",
        getBook
    });
   }catch(error){
    return res.status(404).json({
        message : "Something went wrong while fetching a bookings",
        error : error.message
    });
   }
}

export const getBooking = async(req ,res ,next)=>{
    try
    {
     const getBook = await Bookings.find();
     if(!getBook)
     {
         return res.status(404).json({
             message : "No Bookings found"
         });
     }
     
     return res.status(200).json({
         message : "Bookings fetch successfully",
         getBook
     });
    }catch(error){
     return res.status(404).json({
         message : "Something went wrong while fetching a bookings",
         error : error.message
     });
    }
 }

 export const deleteBookings = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleteBookings = await Bookings.findByIdAndDelete(id).populate(["user", "movie"]);

        if (!deleteBookings) {
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        if (deleteBookings.user) {
            await deleteBookings.user.bookings.pull(deleteBookings._id);
            await deleteBookings.user.save({ session });
        }

        
        if (deleteBookings.movie) {
            await deleteBookings.movie.bookings.pull(deleteBookings._id);
            await deleteBookings.movie.save({ session });
        }

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message: "Bookings deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while deleting booking",
            error: error.message
        });
    }
};
