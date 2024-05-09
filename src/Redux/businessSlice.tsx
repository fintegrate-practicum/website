import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Business from '../business'

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
        createBusiness: (state, actions: PayloadAction<{ id: number, name: string, owner: string, email: string }>) => {

            state.newBusiness = {
                ...state.newBusiness,
                id: actions.payload.id,
                name: actions.payload.name,
                owner: actions.payload.owner,
                email: actions.payload.email
            };
        },
    }
});

export const { createBusiness } = businessSlice.actions;
export default businessSlice.reducer;