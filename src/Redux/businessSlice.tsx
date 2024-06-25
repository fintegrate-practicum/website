import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Business from "../classes/business";;
const http = import.meta.env.VITE_SERVER_URL;

import instance from '../auth0/interceptors'

const initialState = {
    business: {
        companyNumber: " ",
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
        saveBusiness: (state,actions) => { 
            state.business.companyNumber=actions.payload.companyNumber
            state.business.email=actions.payload.email            
        },     
    }
});    

export const createBusiness = createAsyncThunk('', async (_business:Business) => {    
    try {        
        const response = await instance.post('/business', _business);              
        return response
    } catch (error: any) {
        if (error.response.data.statusCode == 400)
            alert(error.response.data.message);
        return error
    }
});

export const checkEmailVerificationCode = createAsyncThunk('', async (payload: {email: string|undefined, code: string}) => {
    console.log(payload.email);
    
    try {
        const response = await instance.get(`/verification/validate`, {params: {email: payload.email, code: payload.code}})
        return response
    } catch (error: any) {
        if(error.response.data.statusCode == 400)
            alert(error.response.data.message);
        return error
    }
});

export const updateBusiness = createAsyncThunk('', async (payload: any) => {     
    
        const { companyNumber, newData } = payload;
        try {           
            const response = await instance.put(`/business/${companyNumber}`, newData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
)

export const { saveBusiness} = businessSlice.actions;
export default businessSlice.reducer;