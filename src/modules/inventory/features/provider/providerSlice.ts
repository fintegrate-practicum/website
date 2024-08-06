import { createSlice } from '@reduxjs/toolkit';
import {
	deleteItem,
	setData,
	addItem,
	updateItem,
	State,
} from '../../app/actions';

export interface Provider {
	id: string;
}
const initialState: State<Provider> = {
	data: [],
};

const providerSlice = createSlice({
	name: 'provider',
	initialState,
	reducers: {
		deleteProvider: deleteItem,
		addProvider: addItem,
		getAllProviders: setData,
		updateProvider: updateItem,
	},
});

export const { deleteProvider, addProvider, getAllProviders, updateProvider } =
	providerSlice.actions;
export default providerSlice.reducer;
