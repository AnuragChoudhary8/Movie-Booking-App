import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import Bookings from "../models/Bookings.js";

export const getAllUsers = async(req ,res ,next)=>{
    let users;
    try{
        users = await User.find();
    }catch(error){
        return next(error);
    }

    if(!users){
        return res.status(500).json({message : "Unexpected error occured"});
    }
    return res.status(200).json({users});
};


export const singup = async(req ,res ,next)=>{
    const{name , email , password} = req.body;
    if(!name &&name.trim() ===""
        &&!email && email.trim() ===""
        &&!password&&password.trim() ==="")
        {
            return res.status(422).json({
                message : "All fields are required"
            })
        }
        const existingusers = await User.findOne({ email})
            if(existingusers)
            {
                return res.status(300).json({
                    message : "users already exists"
            }) 
            }
            const hashedPassword = bcrypt.hashSync(password,10);
        let user;
        try{
            const user = await User.create({
                name , email , password : hashedPassword
            })
            if(!user){ 
                return res.status(500).json({
                    message : "something occurs wrong while creating the user object in the database"
            })
        }
        return res.status(201).json({id: user._id});
        }catch(error){
            return next(error);
        }
}

export const updateUser = async(req , res ,next)=>{
    const id = req.params.id;
    const{name , email , password} = req.body;
    if(!name &&name.trim() ===""
    &&!email && email.trim() ===""
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
    let user;
    try{
        user = await User.findByIdAndUpdate(id ,{
            name ,
            email ,
            password : hashedPassword
        }).exe();
        if(!user){ 
            return res.status(500).json({
                message : "something occurs wrong while updating the user object in the database"
        })
    }
        return res.status(200).json({
            message : "User update succesfully",
            user : user._id
        })
    }catch(error){
        return next(error);
    }
};

export const deleteuser = async(req ,res ,next)=>{
    const id = req.params.id;
    let user;
    try{
        if(!id)
            {
                return res.status(422).json({
                    message : "invalid ID"
                })
            }
        user = await User.findByIdAndDelete(id);
        return res.status(200).json({
            message : "User deleted successfully",
            user
        })
    }catch(error){
        return next(error);
    }
}


export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the details carefully" });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "User is not registered with us. Please sign up to continue",
            });
        }

        // Compare the password using bcrypt
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (isPasswordCorrect) {
            const payload = {
                email: existingUser.email,
                id: existingUser._id,  // Make sure _id is used here
                accountType: "User"
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

            existingUser.token = token;
            existingUser.password = undefined;  // Remove password from the response

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            // Send the userId as part of the response
            return res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                userId: existingUser._id,  // Send userId explicitly in the response
                message: "User login successful",
            });
        } else {
            return res.status(401).json({ message: "Password is incorrect" });
        }
    } catch (error) {
        return next(error);
    }
};


export const getBookingsOfUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        const bookings = await Bookings.find({ user: userId }).populate(['movie', 'user']);

        res.status(200).json({
            message: "Bookings fetched successfully",
            bookings,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            error,
        });
    }
};


export const getUserById = async(req ,res ,next)=>{
    const id = req.params.id;
    let user;
    try{
        user = await User.findById(id);
    }catch(err)
    {
        return console.log(err)
    }
    if(!user)
    {
        return res.status(500).json({
            message : "unexpected Error occured"
        })
    }
    return res.status(200).json({user});
};