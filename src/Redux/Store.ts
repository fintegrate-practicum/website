import { configureStore } from '@reduxjs/toolkit'
import userSlice from './reducer.js'

export const Store = configureStore({
    reducer: {
        user: userSlice,
    },
})






