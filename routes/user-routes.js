import express from 'express';
const userRouter = express.Router();
import { deleteuser, getAllUsers, getBookingsOfUser, getUserById, singup, updateUser } from '../controllers/user-controller.js'
import { Login } from '../controllers/user-controller.js';


userRouter.get("/", getAllUsers);
userRouter.post("/signup",singup);
userRouter.put("/:id",updateUser);
userRouter.delete("/:id",deleteuser);
userRouter.post("/login",Login);
userRouter.get("/booking/:id",getBookingsOfUser);
userRouter.get("/:id", getUserById)

export default userRouter;