import './Inventory.css';
import React from 'react';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import ShowProducts from './components/showProducts/AllProducts';
import SingleProductDetails from './components/showProducts/singleProductDetails';
import { useAppSelector } from './app/hooks';


function Inventory() {

  return (
    <div>
      <Routes>
        <Route path="/products" element={<ShowProducts />} />
        <Route path="/products/:productId" element={<SingleProductDetails/>}/>
      </Routes>
    </div>
  );
}

export default Inventory;




