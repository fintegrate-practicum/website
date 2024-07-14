import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "../modules/workers/Redux/employeeSlice";
import taskSlice from "../modules/workers/Redux/taskSlice";
import messageSlice from "../modules/workers/Redux/messageSlice";
import userSlice from '../modules/workers/Redux/reducer'
import businessSlice from './businessSlice'
import currentUserSlice from "./currentUserSlice";

const Store = configureStore({
    reducer: {
        user: userSlice,
        businessSlice,
        employeeSlice,
        taskSlice,
        messageSlice,
        currentUserSlice,

    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store;