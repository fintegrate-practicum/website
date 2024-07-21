import './App.css';
import AddProductForm from './components/AddProductForm';
import { Route, Routes } from 'react-router-dom';
import { ComponentForm } from './components/ComponentForm';

// import ShowProducts from './components/showProducts/AllProducts';
function Inventory() {
  const p = {
      
    "id": "6693958b438c19b25cdeab38",
    "productName": "aaaaaaaaaaaaaaa",
    "productDescription": "this ihhhh one",
    "componentsImages": [
        "1",
        "2"
    ],
    "packageCost": 100,
    "productComponents": [
        "12131", "7887"
    ],
    "totalPrice": 4040,
    "adminId": "1234567",
    "isActive": true,
    "isOnSale": true,
    "salePercentage":50,
    "stockQuantity": 2483,
    "bussinesId": "987f65",
    "componentStatus": "gvfvgewiuf"
}
  return (
    <>
      <h1>Inventory</h1>
      <Routes>
        <Route path="products" element={<AddProductForm />} />
        <Route path="components" element={<ComponentForm />} />
      </Routes>

    </>
  );
}
export default Inventory

