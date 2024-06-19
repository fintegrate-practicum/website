import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Business from "../classes/business";

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
        const response = await axios.post(`${http}/business`, _business)
        return response.data
    } catch (error: any) {
        if(error.response.data.statusCode == 400)
            alert(error.response.data.message);
        return error
    }
});

// export const { } = businessSlice.actions;
export default businessSlice.reducer;