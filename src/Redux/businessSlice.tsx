import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Business from "../classes/business";
import InfraInterceptors from '../auth0/InfraInterceptors'

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
        const response = await InfraInterceptors.post('/business', _business);                                 
        return response
    } catch (error: any) {
        if (error.response.data.statusCode == 400)
            alert(error.response.data.message);
        return error
    }
});

export const checkEmailVerificationCode = createAsyncThunk('', async (payload: {email: string|undefined, code: string}) => {    
    try {
        const response = await InfraInterceptors.get(`/verification/validate`, {params: {email: payload.email, code: payload.code}})
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
            console.log("companyNumber" ,companyNumber);
            console.log("newData" ,newData);

            const response = await InfraInterceptors.put(`/business/${companyNumber}`, newData);
             // בדוק את התגובה כאן
        if (response.status === 200 || response.status === 201) {
            console.log("העסק עודכן בהצלחה:", response.data);
            return response.data;
        } else {
            throw new Error("עדכון העסק נכשל");
        }
            // return response.data;
        } catch (error) {
            throw error;
        }
    }
)

export const { saveBusiness} = businessSlice.actions;
export default businessSlice.reducer;