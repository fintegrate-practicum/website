import { configureStore } from "@reduxjs/toolkit";
import businessSlice from './businessSlice'
import currentUserSlice from "./currentUserSlice";
import productSlice from "../modules/inventory/features/product/productSlice";
<<<<<<< HEAD
=======
import componentSlice from "../modules/inventory/features/component/componentSlice";
import providerSlice from "../modules/inventory/features/provider/providerSlice";
import { userSlice } from "../modules/workers/features/reducer";
import employeeSlice from "../modules/workers/features/employeeSlice";
import taskSlice from "../modules/workers/features/taskSlice";
import messageSlice from "../modules/workers/features/messageSlice";
>>>>>>> 51ff297567e06af8982fe0339081c5c670f3cf26

const Store = configureStore({
    reducer: {
        businessSlice,
        currentUserSlice,
        user: userSlice.reducer,
        employeeSlice,
        taskSlice,
        messageSlice,
<<<<<<< HEAD
        currentUserSlice,
        product : productSlice
    }
})
=======
        product: productSlice,
        component: componentSlice,
        provider: providerSlice

    }, 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    },)
>>>>>>> 51ff297567e06af8982fe0339081c5c670f3cf26

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store;
