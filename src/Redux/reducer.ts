import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: {
        companyNumber: "",
        name: "",
        password: "",
        email: "",
        phone: ""
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
});

export const { } = userSlice.actions;
export default userSlice.reducer;