import AddProductForm from './components/AddProductForm';
import { ComponentForm } from './components/ComponentForm';
import ShowProducts from './components/ClientShowProducts/AllProducts';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SingleProductDetails from './components/ClientShowProducts/singleProductDetails';
import AllProducts from './components/ManagerShowProducts/AllProducts';
import { useTranslation } from 'react-i18next';
import { IOrder } from '../orders/interfaces/IOrder';
import { useEffect } from 'react';

function Inventory() {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  
  // const o: IOrder = {
  //   userId: "66b1e9c380d2712ac832175e",
  //   products: [
  //     { id: "669f733b8bb7dbf0f41232b0", qty: 1 },
  //     { id: "66b4cdb77a242a02f6f7e595", qty: 1 }
  //   ],
  //   deliveryMethod:"delivery",
  //   destinationAddress: {
  //     city: "sss",
  //     street: "fff",
  //     numBuild: 5,
  //     apartmentNumber: 9,
  //     floor: 9,
  //     lastName: "string"
  //   },
  //   _id: { $oid: "66b1e799d001b9b22b464ddf" },
  //   status: 0,
  //   date: { $date: "2024-08-06T08:51:39.180Z" },
  //   businessCode: "6698f7634b7b32574ede5415",
  //   id: "66b1e799d001b9b22b464ddd",
  //   settingManeger: 7,
  //   createdAt: { $date: "2024-08-06T09:06:33.847Z" },
  //   updatedAt: { $date: "2024-08-06T09:06:33.847Z" }
  // };

  // useEffect(() => {
  //   navigate('/ConfirmeOrder', { state: { newOrder: o } });
  // }, []);

  return (
    <>
      <h1>{t('inventory.Inventory')}</h1>
      <Routes>
        <Route path='/productForm/:productId?' element={<AddProductForm />} />
        <Route
          path='/componentForm/:componentId?'
          element={<ComponentForm />}
        />
        <Route path='/products' element={<ShowProducts />} />
        <Route path='/products/:productId' element={<SingleProductDetails />} />
        <Route path='/productsAdmin' element={<AllProducts />}></Route>
      </Routes>
    </>
  );
}

export default Inventory;
