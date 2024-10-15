import React from 'react';
import { AuthForm } from '../Auth/AuthForm';
import { sendUserAuthRequest } from '../../api-helpers/Api-helpers';
import { userActions, adminActions } from '../../store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onResReceived = (data) => {
        dispatch(adminActions.logout()); // Logout admin if logged in
        dispatch(userActions.login());
        localStorage.setItem("userId", data.userId);
        localStorage.removeItem("adminId"); // Clear admin ID
        navigate("/");
    };

    const getData = (data) => {
        console.log("User Data:", data);
        sendUserAuthRequest(data.inputs, data.signup)
            .then((res) => {
                if (res) {
                    console.log("User Auth Response: ", res);
                    onResReceived(res);
                }
            })
            .catch((err) => console.error("Error in user auth request:", err));
    };

    return <div><AuthForm onSubmit={getData} isAdmin={false} /></div>;
};
