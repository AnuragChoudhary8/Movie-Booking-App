import express from 'express';
import { signup , Login, updateAdmin, deleteAdmin, getAdmin, getAdminById } from '../controllers/admin-controller.js';
const adminRouter = express.Router();

adminRouter.post("/signup",signup);
adminRouter.post("/login",Login);
adminRouter.put("/:id",updateAdmin);
adminRouter.delete("/:id",deleteAdmin);
adminRouter.get("/",getAdmin)
adminRouter.get("/:id",getAdminById)

export default adminRouter;