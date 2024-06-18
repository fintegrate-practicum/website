import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Business from "../business";

const http = import.meta.env.VITE_SERVER_URL;

const initialState = {
    business: {
        companyNumber: 0,
        description: " ",
        name: " ",
        email: " ",
        logo: " ",
        phone: " ",
        address: {
            city: " ",
            street: " ",
            num: " "
        },
        owner: " ",
        businessSize: " ",
        industryType: " ",
        establishmentDate: " "
    }
}

export const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
    }
});


export const createBusiness = createAsyncThunk('', async (_business: Business) => {
    try {
        const response = await axios.post(`${http}/business?name=${_business.name}&email=${_business.email}`)
        return response.data
    } catch (error) {
        return error
    }
});

export const checkEmailVerificationCode = createAsyncThunk('', async (payload: any) => {
    try {
        const response = await axios.get(`${http}/verification/validate`, payload)
        return response.data
    } catch (error: any) {
        if(error.response.data.message == false)
            alert("הסיסמא אינה תקינה");
        return error
    }
});

// export const { } = businessSlice.actions;
export default businessSlice.reducer;