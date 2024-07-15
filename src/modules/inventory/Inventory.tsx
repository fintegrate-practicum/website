import './App.css';
import AddProductForm from './components/AddProductForm';
import { Route, Routes } from 'react-router-dom';

// import ShowProducts from './components/showProducts/AllProducts';
function Inventory() {
  return (
    <>
      <h1>Inventory</h1>
      <h1>נווט לii כדי לראות את טופס הוספת מוצר</h1>
      <Routes>
        <Route path="ii" element={<AddProductForm />} />
      </Routes>

    </>
  );
}
export default Inventory

