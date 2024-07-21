import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteItem, setData, addItem, updateItem, State } from "../../app/actions";
import { IProduct } from "../../interfaces/IProduct";
  
const initialState: State<IProduct> = {
    data: [],
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        deleteProduct: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                data: state.data.filter(item => item.id !== action.payload)
            };
        },
        addProduct: addItem,
        getProducts: setData,
        updateProduct: updateItem,
    }
});

export const { deleteProduct, addProduct, getProducts, updateProduct } = productSlice.actions;
export default productSlice.reducer;