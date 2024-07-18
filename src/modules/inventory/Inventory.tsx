import './App.css';
import AddProductForm from './components/AddProductForm';
import { ComponentForm } from './components/ComponentForm';
import ShowProducts from './components/showProducts/AllProducts';
import React from 'react';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import ShowProducts from './components/showProducts/AllProducts';
import SingleProductDetails from './components/showProducts/singleProductDetails';
import { useAppSelector } from './app/hooks';


function Inventory() {

  return (
    <>
      <h1>Inventory</h1>
      <Routes>
        <Route path="/productForm" element={<AddProductForm />} />
        <Route path="/componentForm" element={<ComponentForm />} />
        <Route path="/products" element={<ShowProducts />} />
        <Route path="/products/:productId" element={<SingleProductDetails/>}/>
      </Routes>
    </>
  );
}

export default Inventory;

