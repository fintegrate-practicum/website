import React, { useEffect, useState } from 'react';
import Typography from '../../../common/components/Typography/Typography';
import Button from '../../../common/components/Button/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Toast from '../../../common/components/Toast/Toast';
import TableComponent from '../../../common/components/Table/TableComponent';
import { useTranslation } from 'react-i18next';
import { DataObject } from '../../../common/components/Table/interfaces';
import TextField from '@mui/material/TextField';

interface BagItem {
  id?: string;
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
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');

  useEffect(() => {
    calculateTotal();
  }, [bag]);

  const calculateTotal = () => {
    const sum = bag.reduce((acc, item) => acc + item.price * item.amount, 0);
    setTotal(sum);
  };

  const handleRemove = (id: string) => {
    if (window.confirm(t('order.confirmRemove'))) {
      const newBag = bag.filter((b) => b.id !== id);
      setBag(newBag);
      setToastMessage(t('order.productRemoved'));
      setToastSeverity('warning');
      setToastOpen(true);
    }
  };

  const handleAmountChange = (id: string, key: string, value: number) => {
    const newAmount = value;
    if (newAmount === 0) {
      handleRemove(id);
    } else {
      const newBag = bag.map((item) => {
        if (item.id === id) {
          return { ...item, amount: newAmount };
        }
        return item;
      });
      setBag(newBag);
      setToastMessage(t('order.quantityUpdated'));
      setToastSeverity('success');
      setToastOpen(true);
    }
  };

  const handleCheckout = () => {
    alert(t('order.paymentClicked'));
    setToastMessage(t('order.checkoutInitiated'));
    setToastSeverity('info');
    setToastOpen(true);
  };

  const dataObject: DataObject = {
    headers: [
      {
        key: 'name',
        label: t('order.name'),
        type: 'text',
        renderCell: (params) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={params.row.image}
              alt='thumbnail'
              style={{ width: '50px', height: '50px', marginRight: '8px' }}
            />
            <span>{params.value}</span>
          </div>
        ),
      },
      { key: 'model', label: t('order.Model'), type: 'text' },
      {
        key: 'amount',
        label: t('order.amount'),
        type: 'number',
        renderCell: (params) => (
          <TextField
            type='number'
            value={params.value}
            onChange={(e) =>
              handleAmountChange(
                params.id.toString(),
                'age',
                Number(e.target.value),
              )
            }
            variant='outlined'
            size='small'
            style={{ width: '100%' }}
            InputProps={{
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
        ),
      },
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
    rows: bag.map((item, index) => ({
      ...item,
      id: index.toString(),
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
          />
          <Typography variant='h6'>
            {' '}
            {t('order.Amount to be paid :')} {total.toFixed(2)} ₪{' '}
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              gap: '38%',
            }}
          >
            <Button
              onClick={handleCheckout}
              startIcon={<ArrowBackIosIcon />}
              style={{ textTransform: 'none' }}
              size='large'
            >
              {t('order.checkout')}
            </Button>
          </div>
        </>
      )}

      <Toast
        message={toastMessage}
        severity={toastSeverity}
        open={toastOpen}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
};

export default ShoppingBag;
