import { createSlice } from "@reduxjs/toolkit";

const {workersInitial = {}} = ("קריאת שרת להבאת הנתונים");

const workerSlice = createSlice({
    name: "workers",
    initialState: workersInitial,
    reducers: {
        add: (state, actions) => {
            actions.payload.id  = state.id;
            state.id++;
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