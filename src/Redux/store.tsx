import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";
import taskSlice from "./taskSlice";
import messageSlice from "./messageSlice";
import userSlice from './reducer'
import businessSlice from './businessSlice'
import currentUserSlice from "./currentUserSlice";
import productSlice from "../modules/inventory/features/product/productSlice";

const Store = configureStore({
    reducer: {
        user: userSlice,
        businessSlice,
        employeeSlice,
        taskSlice,
        messageSlice,
        currentUserSlice,
        product : productSlice
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store;