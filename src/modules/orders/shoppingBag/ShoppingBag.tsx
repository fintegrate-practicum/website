import React, { useEffect, useState } from 'react';
import './shoppingBag.css';
import TextField from '../../../common/component/TextField/TextField';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import Typography from '../../../common/components/Typography/Typography';
import Button from '../../../common/components/Button/Button';
import DeleteForever from '@mui/icons-material/DeleteForever';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Toast from '../../../common/components/Toast/Toast';

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
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');

  useEffect(() => {
    calculateTotal();
  }, [bag]);

  const calculateTotal = () => {
    const sum = bag.reduce((acc, item) => acc + item.price * item.amount, 0);
    setTotal(sum);
  };

  const handleRemove = (index: number) => {
    if (window.confirm(t('order.confirmRemove'))) {
      const newBag = bag.filter((_, i) => i !== index);
      setBag(newBag);
      setToastMessage(t('order.productRemoved'));
      setToastSeverity('warning');
      setToastOpen(true);
    }
  };

  const handleAmountChange = (index: number, newAmount: number) => {
    if (newAmount === 0) {
      handleRemove(index);
    } else {
      const newBag = bag.map((item, i) => {
        if (i === index) {
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

  return (
    <div className='shoppingBag-container'>
      <Typography variant='h5'>{t('order.shoppingBag')}</Typography>
      {bag.length === 0 ? (
        <Typography>{t('order.bagIsEmpty')}</Typography>
      ) : (
        <>
          <Table className='shoppingBag' style={{ direction: 'rtl' }}>
            <TableHead>
              <TableRow>
                <TableCell align='right'>{t('order.productName')}</TableCell>
                <TableCell align='right'>{t('order.quantity')}</TableCell>
                <TableCell align='right'>{t('order.price')}</TableCell>
                <TableCell align='right'>.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bag.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell align='right'>
                    {row.name}{' '}
                    <img src={row.image} width='80px' alt={row.name} />
                  </TableCell>
                  <TableCell align='right'>
                    <TextField
                      type='number'
                      value={row.amount}
                      onChange={(e) =>
                        handleAmountChange(index, Number(e.target.value))
                      }
                    />
                  </TableCell>
                  <TableCell align='right'>
                    {(row.price * row.amount).toFixed(2)} ₪
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton
                      aria-label={t('order.removeProduct')}
                      onClick={() => handleRemove(index)}
                    >
                      <DeleteForever />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCell colSpan={3} className='total_line'>
              {t('order.totalAmount', { total: total.toFixed(2) })}
            </TableCell>
          </Table>
          <Button
            onClick={handleCheckout}
            startIcon={<ArrowBackIosIcon />}
            style={{ textTransform: 'none' }}
            size='large'
          >
            {t('order.checkout')}
          </Button>
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