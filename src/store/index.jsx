// store.js
import { createSlice, configureStore } from "@reduxjs/toolkit";

// User slice
const userSlice = createSlice({
    name: "user",
    initialState: { isLoggedIn: false },
    reducers: {
        login(state,) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            localStorage.removeItem("userId");
        }
    }
});

// Admin slice
const adminSlice = createSlice({
    name: "admin",
    initialState: { isLoggedIn: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
            localStorage.removeItem("adminId");
            localStorage.removeItem("adminToken");
        }
    }
});

// Export actions for use in components
export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;

// Configure store
export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        admin: adminSlice.reducer
    }
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('userIsLoggedIn', state.user.isLoggedIn);
    localStorage.setItem('adminIsLoggedIn', state.admin.isLoggedIn);
});

