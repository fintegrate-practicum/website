import './App.css';
import React from 'react';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import ShowProducts from './components/showProducts/AllProducts';
import SingleProduct from './components/showProducts/singleProduct';
import { useAppSelector } from './app/hooks';


function Inventory() {

  const products = useAppSelector((state) => state.product?.data || []);
  const components = useAppSelector((state) => state.component?.data || []);

  return (
    <div>
      <Routes>
        <Route path="/products" element={<ShowProducts />} />
        <Route path="/products/:productId" element={<SingleProduct product={products.find(p => p.id == useParams().productId)!} />} />
      </Routes>
    </div>
  );
}

export default Inventory;




