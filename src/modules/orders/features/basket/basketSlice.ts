import { createSlice } from '@reduxjs/toolkit';
import { ICart } from '../../interfaces/ICart';
import {
  deleteItem,
  setData,
  addItem,
  updateItem,
  State,
} from '../../../../app/actions';

const initialState: State<ICart> = {
  data: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    deleteFromBasket: deleteItem,
    addToBasket: addItem,
    getBasket: setData,
    updateBasket: updateItem,
  },
});

export const { deleteFromBasket, addToBasket, getBasket, updateBasket } =
  basketSlice.actions;
export default basketSlice.reducer;
