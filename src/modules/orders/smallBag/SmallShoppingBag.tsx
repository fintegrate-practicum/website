import React, { useState, useEffect } from 'react';
import TableComponent from '../../../stories/TableComponent';

const bagData = {
  headers: [
    { key: 'id', label: 'ID', type: 'text' },
    { key: 'name', label: 'פריט', type: 'text', isImage: true },
    { key: 'model', label: 'דגם', type: 'text' },
    { key: 'amount', label: 'כמות', type: 'number', isAmount: true },
    { key: 'price', label: 'מחיר', type: 'number', isPrice: true },
  ],
  rows: [
    {
      id: 1,
      name: 'casual dress',
      profilePic: '/dress.jpg',
      model: 'blue flowers',
      amount: 1,
      price: 125.9,
    },
    {
      id: 2,
      name: 'casual dress',
      profilePic: '/dress.jpg',
      model: 'blue flowers',
      amount: 1,
      price: 125.9,
    },
    {
      id: 3,
      name: 'snickers',
      profilePic: '/dress.jpg',
      model: 'red',
      amount: 1,
      price: 89.9,
    },
    {
      id: 4,
      name: 'snickers',
      profilePic: '/dress.jpg',
      model: 'red',
      amount: 1,
      price: 89.9,
    },
  ],
};

const SmallShoppingBag = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      {isVisible && (
        <>
          <TableComponent
            dataObject={bagData}
            tableSize='small'
            showDeleteButton={false}
            handleAmountChange={() => {}}
            onDelete={() => {}}
          />
        </>
      )}
    </div>
  );
};

export default SmallShoppingBag;
