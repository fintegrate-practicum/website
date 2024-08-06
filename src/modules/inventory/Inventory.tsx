// import './App.css';
import AddProductForm from './components/AddProductForm';
import { ComponentForm } from './components/ComponentForm';
import ShowProducts from './components/showProducts/AllProducts';
import { Routes, Route } from 'react-router-dom';
import SingleProductDetails from './components/showProducts/singleProductDetails';

function Inventory() {
	return (
		<>
			<h1>Inventory</h1>
			<Routes>
				<Route path='/productForm/:productId?' element={<AddProductForm />} />
				<Route
					path='/componentForm/:componentId?'
					element={<ComponentForm />}
				/>
				<Route path='/products' element={<ShowProducts />} />
				<Route path='/products/:productId' element={<SingleProductDetails />} />
			</Routes>
		</>
	);
}

export default Inventory;
