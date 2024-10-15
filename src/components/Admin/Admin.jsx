import React from 'react';
import { AuthForm } from '../Auth/AuthForm';
import { sendAdminAuthRequest } from '../../api-helpers/Api-helpers';
import { adminActions, userActions } from '../../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onResReceived = (data) => {
        dispatch(userActions.logout()); // Logout user if logged in
        dispatch(adminActions.login());
        localStorage.setItem("adminId", data.adminId);
        localStorage.setItem("adminToken", data.token); // Ensure correct key
        localStorage.removeItem("userId"); // Clear user ID
        navigate("/")
    };

    const getData = (data) => {
        console.log("Admin Data:", data);
        sendAdminAuthRequest(data.inputs)
            .then((res) => {
                if (res) {
                    console.log("Admin Auth Response: ", res);
                    onResReceived(res);
                }
            })
            .catch((err) => console.error("Error in admin auth request:", err));
    };

    return <div><AuthForm onSubmit={getData} isAdmin={true} /></div>;
};
