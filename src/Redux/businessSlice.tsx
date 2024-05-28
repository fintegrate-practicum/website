import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
        const response = await axios.post(`${http}/business?id=${_business.companyNumber}&name=${_business.name}&email=${_business.email}`)
        return response.data
    } catch (error) {
        return error
    }
});

export const { } = businessSlice.actions;
export default businessSlice.reducer;