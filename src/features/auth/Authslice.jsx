import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated:localStorage.getItem("isAuthenticated") === "true",
    name: "",
    password: "",
};


const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },

        setPassword: (state, action) => {
            state.password = action.payload;
        },

        login: (state) => {
            state.user = {
                name: state.name,
            };

            state.isAuthenticated = true;
              localStorage.setItem(
        "isAuthenticated",
        "true"
      );
        },

        logout: (state) => {
            state.name = "";
            state.password = "";
            state.user = null;
            state.isAuthenticated = false;

            localStorage.removeItem("isAuthenticated");
        },
    },
});



export const { login, logout, setName, setPassword } = authSlice.actions;
export default authSlice.reducer;