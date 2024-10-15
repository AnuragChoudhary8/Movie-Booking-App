import express from 'express';
import { addMovie, getmovie , getMovieById} from '../controllers/movie-controller.js';
const movieRouter = express.Router();

movieRouter.get("/",getmovie);
movieRouter.get("/:_id",getMovieById);
movieRouter.post("/",addMovie);

export default movieRouter;