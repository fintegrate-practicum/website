import { createStore } from 'redux';
import reducer, { addComponent, deleteComponent } from '../component/componentSlice';
import { IComponent } from "../../interfaces/IComponent";

describe('myReducer', () => {
  it('should add a component to the state', () => {
    const initialState: { data: IComponent[] } = { data: [] };
    const store = createStore(reducer, initialState);

    const newItem: IComponent = { 
      id: "0",
      name: "rivki",
      componentBuyPrice: 50,
      addingComponentDate: new Date("2024-05-28"),
      minQuantity: 3,
      stockQuantity: 6,
      isActive: false,
      adminId: "reuven",
      isSoldSeparately: true,
      description: "des",
      totalPrice: 60, // Corrected type to string
      componentImages: ['1', '2', '3', '4'],
      isOnSale: true,
      salePercentage: 5,
      componentColor: "red",
      componentSize: "medium",
      businessId: "shop"
    };

    store.dispatch(addComponent(newItem));

    expect(store.getState().data).toEqual([newItem]);
  });

  it('should remove a component from the state using deleteComponent', () => {
    const initialState: { data: IComponent[] } = {
      data: [{
        id: "0",
        name: "rivki",
        componentBuyPrice: 50,
        addingComponentDate: new Date("2024-05-28"),
        minQuantity: 3,
        stockQuantity: 6,
        isActive: false,
        adminId: "reuven",
        isSoldSeparately: true,
        description: "des",
        totalPrice: 60,
        componentImages: ['1', '2', '3', '4'],
        isOnSale: true,
        salePercentage: 5,
        componentColor: "red",
        componentSize: "medium",
        businessId: "shop"
      }],
    };

    const store = createStore(reducer, initialState);

    const itemIdToDelete = "0";

    store.dispatch(deleteComponent(itemIdToDelete));

    const expectedState = {
      data: initialState.data.filter((item) => item.id !== itemIdToDelete),
    };

    expect(store.getState()).toEqual(expectedState);
  });
});