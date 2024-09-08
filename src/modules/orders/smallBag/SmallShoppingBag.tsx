import React, { useState, useEffect } from 'react';
import TableComponent from '../../../common/components/Table/TableComponent';
import { DataObject } from '../../../common/components/Table/interfaces';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
import Button from '../../../common/components/Button/Button';

const SmallShoppingBag = () => {
  const { t } = useTranslation();
  const bagData: DataObject = {
    headers: [
      { key: 'id', label: 'ID', type: 'text' },
      {
        key: 'name',
        label: t('order.name'),
        type: 'text',
        renderCell: (params) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={params.row.profilePic}
              alt='thumbnail'
              style={{ width: '50px', height: '50px', marginRight: '8px' }}
            />
            <span>{params.value}</span>
          </div>
        ),
      },
      { key: 'model', label: t('order.Model'), type: 'text' },
      { key: 'amount', label: t('order.amount'), type: 'number' },
      {
        key: 'price',
        label: t('order.price'),
        type: 'number',
        renderCell: (params) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>₪</span>
            {params.value}
          </div>
        ),
      },
    ],
    rows: [
      {
        id: 1,
        name: 'casual dress',
        model: 'blue flowers',
        amount: 1,
        price: 125.9,
      },
      {
        id: 2,
        name: 'casual dress',
        model: 'blue flowers',
        amount: 1,
        price: 125.9,
      },
      {
        id: 3,
        name: 'snickers',
        model: 'red',
        amount: 1,
        price: 89.9,
      },
      {
        id: 4,
        name: 'snickers',
        model: 'red',
        amount: 1,
        price: 89.9,
      },
    ],
  };

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);
  const exportToExcel = () => {
    const data = bagData.rows.map((item) => ({
      id: item.id,
      name: item.name,
      model: item.model,
      price: item.price,
      amount: item.amount,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'MYSavedData.xlsx');
  };
  return (
    <div>
      {isVisible && (
        <>
          <TableComponent
            dataObject={bagData}
            tableSize='small'
            showDeleteButton={false}
          />
          <Button onClick={exportToExcel} variant='outlined'>
            Export to Excel
          </Button>
        </>
      )}
    </div>
  );
};

export default SmallShoppingBag;
