import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Business from '../classes/Business'
import infraInstance from '../auth0/InfraInterceptors'

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
    },
    toast: {
        message: "",
        severity: "info",
        open: false
    }
};

export const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        saveBusiness: (state, action) => { 
            state.business.companyNumber = action.payload.companyNumber;
            state.business.email = action.payload.email;            
        },
        setToast: (state, action) => {
            state.toast = action.payload;
        },
        clearToast: (state) => {
            state.toast = {
                message: "",
                severity: "info",
                open: false
            };
        }
    }
});

export const createBusiness = createAsyncThunk('business/createBusiness', async (_business: Business, { dispatch }) => {    
    try {              
        const response = await infraInstance.post('/business', _business);                                 
        return response;
    } catch (error: any) {
        const message = error.response?.data?.message || 'שגיאה לא ידועה';
        dispatch(setToast({ message, severity: 'error', open: true }));
        throw error;
    }
});

export const checkEmailVerificationCode = createAsyncThunk('business/checkEmailVerificationCode', async (payload: {email: string | undefined, code: string}, { dispatch }) => {    
    try {
        const response = await infraInstance.get(`/verification/validate`, { params: { email: payload.email, code: payload.code } });
        return response;
    } catch (error: any) {
        const message = error.response?.data?.message || 'שגיאה לא ידועה';
        dispatch(setToast({ message, severity: 'error', open: true }));
        throw error;
    }
});

export const updateBusiness = createAsyncThunk('business/updateBusiness', async (payload: any, { dispatch }) => {     
    const { companyNumber, newData } = payload;
    try {           
        const response = await infraInstance.put(`/business/${companyNumber}`, newData);
        return response.data;
    } catch (error) {
        const message = 'שגיאה בעת עדכון העסק';
        dispatch(setToast({ message, severity: 'error', open: true }));
        throw error;
    }
});

export const { saveBusiness, setToast, clearToast } = businessSlice.actions;
export default businessSlice.reducer;
