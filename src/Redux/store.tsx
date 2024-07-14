import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../modules/workers/Redux/reducer'
import businessSlice from './businessSlice'
import currentUserSlice from "./currentUserSlice";

const Store = configureStore({
    reducer: {
        user: userSlice,
        businessSlice,
        currentUserSlice,
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store;