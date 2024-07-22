import { createSlice } from "@reduxjs/toolkit";
import { deleteItem, setData, addItem, updateItem, State } from "../../app/actions";
import { IProduct } from "../../interfaces/IProduct";
  
const initialState: State<IProduct> = {
    data:[]
    //  [{
    //     id: "1",
    //     name: "aaa",
    //     description: "ffdd",
    //     componentsImages: [""],
    //     packageCost: 1,
    //     productComponents: [""],
    //     totalPrice: 2,
    //     adminId: "gg",
    //     isActive: true,
    //     isOnSale: false,
    //     salePercentage: 1,
    //     stockQuantity: 2,
    //     bussinesId: "Gfg",
    //     componentStatus: "fd"
    // }]
}
    const productSlice = createSlice({
        name: "product",
        initialState,
        reducers: {
            deleteProduct: deleteItem,
            addProduct: addItem,
            getProducts: setData,
            updateProduct: updateItem,
        }
    });

    export const { deleteProduct, addProduct, getProducts, updateProduct } = productSlice.actions;
    export default productSlice.reducer;
