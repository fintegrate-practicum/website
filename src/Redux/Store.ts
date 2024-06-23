// import { configureStore } from '@reduxjs/toolkit'
// import userSlice from './reducer.js'
// import businessSlice from './businessSlice.js'
// export const Store = configureStore({
//     reducer: {
//         user: userSlice,
//         business:businessSlice
//     },
// })

// export type RootState = ReturnType<typeof Store.getState>
// export type AppDispatch = typeof Store.dispatch

import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducer.js'  // Adjust the import path to your actual file
import businessSlice from './businessSlice.js'; // Adjust the import path to your actual file

// Combine your slices
const Store = configureStore({
  reducer: {
    user: userSlice,
    business: businessSlice
  }
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
