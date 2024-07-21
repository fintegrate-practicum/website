import './App.css';
import AddProductForm from './components/AddProductForm';
import { ComponentForm } from './components/ComponentForm';
import ShowProducts from './components/showProducts/AllProducts';
import { Route, Routes } from 'react-router-dom';


function Inventory() {
  return (
    <>
      <ShowProducts />
      <h1>Inventory</h1>
      <Routes>
        <Route path="/productForm" element={<AddProductForm />} />
        <Route path="/componentForm" element={<ComponentForm />} />
      </Routes>
    </>
  );
}

export default Inventory;
