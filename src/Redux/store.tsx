import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";
import taskSlice from "./taskSlice";
import messageSlice from "./messageSlice";
import userSlice from './reducer'
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

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store;