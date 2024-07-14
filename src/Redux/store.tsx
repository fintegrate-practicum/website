import { configureStore } from "@reduxjs/toolkit";
import businessSlice from './businessSlice'
import currentUserSlice from "./currentUserSlice";

const Store = configureStore({
    reducer: {
        businessSlice,
        currentUserSlice,
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store;