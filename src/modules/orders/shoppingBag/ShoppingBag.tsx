import React, { useEffect, useState } from 'react';
import Typography from '../../../common/components/Typography/Typography';
import Button from '../../../common/components/Button/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TableComponent from '../../../common/components/Table/TableComponent';
import { useTranslation } from 'react-i18next';
import { DataObject } from '../../../common/components/Table/interfaces';

interface BagItem {
  image: string;
  name: string;
  model: string;
  description: string;
  price: number;
  size: number;
  amount: number;
}

const ShoppingBag: React.FC<{ initialBag?: BagItem[] }> = ({ initialBag }) => {
  const { t } = useTranslation();
  const [bag, setBag] = useState<BagItem[]>(initialBag || []);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    calculateTotal();
  }, [bag]);

  const calculateTotal = () => {
    const sum = bag.reduce((acc, item) => acc + item.price * item.amount, 0);
    setTotal(sum);
  };

  const handleRemove = (id: string) => {
    if (window.confirm(t('order.confirmRemove'))) {
      const newBag = bag.filter((_, i) => i !== parseInt(id));
      setBag(newBag);
    }
  };

  const handleAmountChange = (id: string, key: string, value: number) => {
    const newAmount = value;
    if (newAmount === 0) {
      handleRemove(id);
    } else {
      const newBag = bag.map((item, i) => {
        if (i === parseInt(id)) {
          return { ...item, amount: newAmount };
        }
        return item;
      });
      setBag(newBag);
    }
  };

  const dataObject: DataObject = {
    headers: [
      { key: 'name', label: 'שם המוצר', type: 'text', isImage: true },
      { key: 'model', label: 'דגם', type: 'text' },
      { key: 'amount', label: 'כמות', type: 'number', isAmount: true },
      { key: 'price', label: 'מחיר', type: 'number', isPrice: true },
    ],
    rows: bag.map((item, index) => ({
      id: index,
      ...item,
      price: (item.price * item.amount).toFixed(2),
    })),
  };

  return (
    <div>
      <Typography variant='h5'> {t('order.shoppingBag')} </Typography>
      {bag.length === 0 ? (
        <Typography> {t('order.bagIsEmpty')}</Typography>
      ) : (
        <>
          <TableComponent
            dataObject={dataObject}
            tableSize='large'
            showDeleteButton={true}
            onDelete={handleRemove}
            handleAmountChange={handleAmountChange}
          />
          <Typography variant='h6'>
            {' '}
            סכום לתשלום: {total.toFixed(2)} ₪{' '}
          </Typography>
          <Button
            onClick={() => alert(t('order.paymentClicked'))}
            startIcon={<ArrowBackIosIcon />}
            style={{ textTransform: 'none' }}
            size='large'
          >
            {t('order.checkout')}
          </Button>
        </>
      )}
    </div>
  );
};

export default ShoppingBag;
