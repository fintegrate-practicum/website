import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducer.js'
import businessSlice from './businessSlice'

export const Store = configureStore({
    reducer: {
        user: userSlice,
        business:businessSlice
    },
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch