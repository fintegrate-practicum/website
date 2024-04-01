import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const res = await axios.get('');
const {data = {}} = res;

const workerSlice = createSlice({
    name: "workers",
    initialState: data,
    reducers: {
        add: (state, actions) => {
            state.workers.push(actions.payload)
        },
        remove: (state, actions) => {
            state.workers = state.workers.filter(w => w.id!==actions.payload)
        },
        update: (state, actions) => {
            const worker = state.workers.find(w => w.id === actions.payload.id)
            worker.name = actions.payload.name;
            worker.age = actions.payload.age;
        }
    }
})

export const {add, remove, update} = workerSlice.actions;
export default workerSlice.reducer;