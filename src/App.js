import React, { useEffect } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { Movies } from "./components/Movies/Movies";
import { Auth } from "./components/Auth/Auth";
import { Admin } from "./components/Admin/Admin";
import { Booking } from "./components/Bookings/Booking";
import { useDispatch, useSelector } from "react-redux";
import { userActions, adminActions } from "./store";
import {Userprofile} from './components/Profile/Userprofile'
import { AddMovie } from "./components/Movies/AddMovie";
import { Adminprofile } from "./components/Profile/Adminprofile";






function App() {
    const dispatch = useDispatch();
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn); 

    console.log("isUserLoggedIn : ", isUserLoggedIn);
    console.log("isAdminLoggedIn : ", isAdminLoggedIn);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const adminId = localStorage.getItem("adminId");

        if (userId) {
            dispatch(userActions.login());
            localStorage.removeItem("adminId"); 
        }
        
        if (adminId) {
            dispatch(adminActions.login());
            localStorage.removeItem("userId"); 
        }
    }, [dispatch]); 

    return (
        <div>
            <Header />
            <section>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/booking/:id" element={<Booking />} />
                    <Route path="/user" element={<Userprofile/>} />
                    <Route path="/add" element={<AddMovie/>} />
                    <Route path="/user-admin" element={<Adminprofile/>} />
                </Routes>
            </section>
        </div>
    );
}

export default App;
