import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Business from "../classes/business";
import { Jwt } from "./hooks";
import api from "./api";

const http = import.meta.env.VITE_SERVER_URL;
const accessToken = Jwt('accessToken');
console.log('Token:', accessToken);
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
    }
});

// יצירת הפונקציה באמצעות createAsyncThunk
export const getBusinessData = createAsyncThunk('getBusinessData', async () => {
    try {
        // ביצוע קריאת GET ל-'/hello'
        const response = await api.get('/hello');
        console.log(response,'response');
        
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.statusCode === 400) {
            alert(error.response.data.message);
        }
        return Promise.reject(error);
    }
});
// export const createBusiness = createAsyncThunk('', async (_business: Business) => {    
//     try {

//         const response = await axios.post(`${http}/business`, _business,{
//             headers: {
//                 Authorization: `Bearer ${accessToken}` 
//             }
//         });
        
//         return response.data
//     } catch (error: any) {
//         if(error.response.data.statusCode == 400)
//             alert(error.response.data.message);
//         return error
//     }
// });


// export const updateBusiness = createAsyncThunk(
//     '',
//     async (payload: any) => {
        
        
//         const { companyNumber, newData } = payload;
//         try {
//             console.log('updateBusiness'+'react');
//             console.log(newData);
//             console.log(companyNumber);
                        
//             const response = await axios.put(`${http}/business/${companyNumber}`, newData);
//             return response.data;
//         } catch (error) {
//             throw error;
//         }
//     }
// )
export const { } = businessSlice.actions;
export default businessSlice.reducer;
// getBusinessData
