import { configureStore } from "@reduxjs/toolkit";
import workerslice from "./workerslice";

const myStore = configureStore({
    reducer:{
        workerslice
    }
})

export default myStore;
