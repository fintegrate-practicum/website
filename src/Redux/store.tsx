import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";
import taskSlice from "./taskSlice";
import messageSlice from "./messageSlice";
import userSlice from './reducer'
import businessSlice from './businessSlice'
import emailSlice from "./emailSlice";

const Store = configureStore({

    reducer: {
        user: userSlice,
        businessSlice,
        employeeSlice,
        taskSlice,
        messageSlice,
        emailSlice
    }

})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store;