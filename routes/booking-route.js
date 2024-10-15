import express from 'express';
import { getBookingById, getBooking, newBooking, deleteBookings } from '../controllers/booking-controller.js';
const bookingRouter = express.Router();

bookingRouter.post("/",newBooking);
bookingRouter.get("/:id",getBookingById);
bookingRouter.get("/",getBooking);
bookingRouter.delete("/:id",deleteBookings);

export default bookingRouter;