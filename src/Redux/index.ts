import { combineReducers } from "redux";
import reducer from './reducer';
const reducers = combineReducers({
    user:reducer
})

export default reducers