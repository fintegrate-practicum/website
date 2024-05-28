import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Business from "../classes/business";

const http = "http://localhost:4000";

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
        const response = await axios.post(`${http}/business?companyNumber=${_business.companyNumber}&name=${_business.name}&email=${_business.email}`)
        console.log(response.status);
        
        if(response.status==400)
            console.log("hhhhhhhhhhhhhhhh", response.data);
            
        return response.data
    } catch (error) {
        alert(error.response.data.message);
        return error
    }
});

export const { } = businessSlice.actions;
export default businessSlice.reducer;