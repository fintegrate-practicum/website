import { configureStore } from "@reduxjs/toolkit";

import productSlice from "../features/product/productSlice";
import componentSlice from "../features/component/componentSlice";
import providerSlice from "../features/provider/providerSlice";
export const store = configureStore({
    reducer: {
        product: productSlice,
        component: componentSlice,
        provider: providerSlice
    }   
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;