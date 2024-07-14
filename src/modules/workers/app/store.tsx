import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "../features/employeeSlice";
import messageSlice from "../features/messageSlice";
import taskSlice from "../features/taskSlice";
import userSlice from '../features/reducer'

const Store = configureStore({
    reducer: {
        user: userSlice,
        employeeSlice,
        taskSlice,
        messageSlice,
    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store;