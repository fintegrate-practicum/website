import { configureStore } from '@reduxjs/toolkit';
import businessSlice from './businessSlice';
import currentUserSlice from './currentUserSlice';
import serviceSettingsSlice from './serviceSettingsSlice';
// import productSlice from '../modules/inventory/features/product/productSlice';
import componentSlice from '../modules/inventory/features/component/componentSlice';
import providerSlice from '../modules/inventory/features/provider/providerSlice';
import { userSlice } from '../modules/workers/features/reducer';
import employeeSlice from '../modules/workers/features/employeeSlice';
import taskSlice from '../modules/workers/features/taskSlice';
import messageSlice from '../modules/workers/features/messageSlice';
import orderSlice from '../modules/orders/features/order/orderSlice';

const Store = configureStore({
  reducer: {
    serviceSettingsSlice,
    businessSlice,
    currentUserSlice,
    user: userSlice.reducer,
    employeeSlice,
    taskSlice,
    messageSlice,
    // product: productSlice,
    component: componentSlice,
    provider: providerSlice,
    order: orderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;
