import { configureStore } from "@reduxjs/toolkit";
import businessSlice from './businessSlice'
import currentUserSlice from "./currentUserSlice";
import { userSlice } from "../modules/workers/features/reducer";
import employeeSlice from "../modules/workers/features/employeeSlice";
import taskSlice from "../modules/workers/features/taskSlice";
import messageSlice from "../modules/workers/features/messageSlice";

const Store = configureStore({
    reducer: {
        businessSlice,
        currentUserSlice,
        user: userSlice.reducer,
        employeeSlice,
        taskSlice,
        messageSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store;