import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NewBusiness from "../classes/newBusiness";
import axios from "axios";

const initialState = {
    business: {
        id: 0,
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
    },
    newBusiness: {
        id: 0,
        name: " ",
        owner: "",
        email: ""
    }
}

export const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
    }
});

export const createBusiness = createAsyncThunk('', async (_business: NewBusiness) => {

    try {
        const response = await axios.post(`http://localhost:4000/business?id=${_business.id}&name=${_business.name}&owner=${_business.owner}&email=${_business.email}`)        
        return response.data
    } catch (error) {
        return error
    }
});

export const { } = businessSlice.actions;
export default businessSlice.reducer;