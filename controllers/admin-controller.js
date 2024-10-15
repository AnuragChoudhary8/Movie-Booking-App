import express from 'express';
import bcrypt from 'bcrypt';
import  jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const signup = async(req, res ,next) => {
    try{

        const {email , password} = req.body;
    if(!email && email.trim() ===""
        &&!password&&password.trim() ==="")
        {
            return res.status(422).json({
                message : "invalid input"
            })
        }
    const existingUser = await Admin.findOne({email});
    if(existingUser)
    {
        return res.status(401).json({
            mrssage : "Admin already exists go to Login"
        })
    }
    const hashedPassword = bcrypt.hashSync(password , 10);
    const admin = await Admin.create({
        email ,
        password : hashedPassword
    })
    const populatedAdmin = await Admin.findById(admin._id).populate("addedMovies");
    if(!admin)
    {
        return res.status(401).json({
            message : "something error occured when creating admin account" 
        });
    }
    return res.status(200).json({
            populatedAdmin,
            existingAdmin : existingUser._id
    });

    }catch(error)
    {
        return next(error);
    }
}

export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if(!email && email.trim() ===""
        &&!password&&password.trim() ==="")
        {
            return res.status(422).json({
                message : "invalid input"
            })
        }

        const existingAdmin = await Admin.findOne({ email });
        if (!existingAdmin) {
            return res.status(401).json({
                success: false,
                message: "User is not registered with us. Please sign up to continue",
            });
        }
        console.log("Admin details : ",existingAdmin);
        // Compare the password using bcrypt
        const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);
        
        if (isPasswordCorrect) {
            const payload = {
                email: existingAdmin.email,
                id: existingAdmin.id,
                accountType: "Admin"
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });

            existingAdmin.token = token;
            existingAdmin.password = undefined; 

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                adminId : existingAdmin._id,
                message: "User login successful",
            });
        } else {
            console.log("Entered Password:", password);
            console.log("Stored Hashed Password:", existingAdmin.password);
            return res.status(401).json({
                message: "Password is incorrect"
            });
        }
    } catch (error) {
        
        return next(error);
    }
};

export const updateAdmin = async(req , res ,next)=>{
    const id = req.params.id;
    const{ email , password} = req.body;
    if(!email && email.trim() ===""
    &&!password&&password.trim() ==="")
    {
        return res.status(422).json({
            message : "invalid input"
        })
    }
    if(!id)
    {
        return res.status(422).json({
            message : "invalid ID"
        })
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    let admin;
    try{
        admin = await Admin.findByIdAndUpdate(id ,{
            email ,
            password : hashedPassword
        }).exe();
        if(!admin){ 
            return res.status(500).json({
                message : "something occurs wrong while updating the user object in the database"
        })
    }
        return res.status(200).json({
            message : "User update succesfully",
            admin
        })
    }catch(error){
        return next(error);
    }
};

export const deleteAdmin = async(req ,res ,next)=>{
    const id = req.params.id;
    let admin;
    try{
        if(!id)
            {
                return res.status(400).json({
                    message : "invalid ID"
                })
            }
            admin = await Admin.findByIdAndDelete(id);
            if(!admin)
            {
                return res.status(422).json({
                    message : "Admin not found in the database"
                })
            }
        return res.status(200).json({
            message : "User deleted successfully",
            admin
        })
    }catch(error){
        return next(error);
    }
};


export const getAdmin = async (req, res,next)=>{
    try{
        const admin = await Admin.find();
        if(!admin){
            return res.status(404).json({
                message : "Admin not found"
            });
        }
        return res.status(200).json({
            message : "Admin found successfully",
            admin
        });
    }catch(error){
        return res.status(404).json({
            message : "Admin not found",
            error : error.message
        });
    }
};

export const getAdminById = async(req ,res ,next)=>{
    const id =req.params.id;
    let admin;
    try{
        admin = await Admin.findById(id).populate("addedMovies");
    }
    catch(err)
    {
        return console.log(err)
    }
    if(!admin)
    {
        return console.log("cannot find Admin")
    }
    return res.status(200).json({admin});
}