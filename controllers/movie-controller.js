import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js'; 
import Movie from '../models/Movie.js'; 



export const addMovie = async (req, res, next) => {
    const session = await mongoose.startSession();
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(403).json({ message: "Token not found" });
        }

        let adminId;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            adminId = decoded.id;
        } catch (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        const { title, description, releaseDate, posterUrl, featured, actors } = req.body;

        if (!title || title.trim() === "" ||
            !description || description.trim() === "" ||
            !releaseDate || releaseDate.trim() === "" ||
            !posterUrl || posterUrl.trim() === "" ||
            !Array.isArray(actors) || actors.length === 0) {
            return res.status(400).json({ message: "Please fill all fields carefully" });
        }

        session.startTransaction();

        const adminUser = await Admin.findById(adminId);
        if (!adminUser) {
            await session.abortTransaction();
            return res.status(404).json({ message: "Admin not found" });
        }

        const movie = new Movie({
            title,
            description,
            releaseDate: new Date(releaseDate),
            posterUrl,
            featured,
            actors,
            admin: adminId
        });

        await movie.save({ session });
        
        adminUser.addedMovies.push(movie._id);
        await adminUser.save({ session });

        await session.commitTransaction();
        
        const adminWithMovies = await Admin.findById(adminId).populate('addedMovies');
        if (!adminWithMovies) {
            return res.status(404).json({ message: "Admin not found" });
        }

        return res.status(200).json({
            message: "Movie created successfully",
            movies: adminWithMovies.addedMovies,
            movie: movie
        });
    } catch (error) {
        await session.abortTransaction();
        return res.status(500).json({
            message: "Something went wrong while creating the movie",
            error: error.message
        });
    } finally {
        session.endSession();
    }
};

export const getmovie = async (req, res, next) => {
    try {
        const movie = await Movie.find(); // Fetching all movies

        if (!movie || movie.length === 0) {
            return res.status(404).json({ message: "No movies found" });
        }

        return res.status(200).json({
            message: "Movies found successfully",
            movie  // Returning movies array
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while fetching movies",
            error: error.message,
        });
    }
};


export const getMovieById = async(req,res ,next)=>{
    try{
        const id = req.params;
        if(!id)
        {
            return res.status(404).json({
                message: "Movie not found"
            })
        }
        const movie = await Movie.findById(id);
        if(!movie)
        {
            return res.status(404).json({
                message: "Movie not found"
            })
        }
        return res.status(200).json({
            message: "Movie found successfully",
            movie
        });
    }catch(error){
        return res.status(500).json({
            message: "Something went wrong while getting the movie"
        });
    }
}
