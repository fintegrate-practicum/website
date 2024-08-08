import React, { useEffect, useState } from 'react';
import './shoppingBag.css';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, IconButton } from '@mui/material';
import Typography from '../../../common/components/Typography/Typography';
import Button from '../../../common/components/Button/Button';
import DeleteForever from '@mui/icons-material/DeleteForever';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Toast from '../../../stories/Toast';

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
  const [bag, setBag] = useState<BagItem[]>(initialBag || []);
  const [total, setTotal] = useState<number>(0);
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('info');

  useEffect(() => {
    calculateTotal();
  }, [bag]);

  const calculateTotal = () => {
    const sum = bag.reduce((acc, item) => acc + item.price * item.amount, 0);
    setTotal(sum);
  };

  const handleRemove = (index: number) => {
    if (window.confirm('האם ברצונך להסיר את המוצר?')) {
      const newBag = bag.filter((_, i) => i !== index);
      setBag(newBag);
      setToastMessage('המוצר הוסר מהסל');
      setToastSeverity('info');
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
    }
  };

  const handlePaymentClick = () => {
    setToastMessage('לחצן התשלום נלחץ');
    setToastSeverity('success');
    setToastOpen(true);
  };

  return (
    <div className='shoppingBag-container'>
      <Typography variant='h5'> סל קניות </Typography>
      {bag.length === 0 ? (
        <Typography> סל הקניות שלך ריק </Typography>
      ) : (
        <>
          <Table className='shoppingBag' style={{ direction: 'rtl' }}>
            <TableHead>
              <TableRow>
                <TableCell align='right'> שם המוצר </TableCell>
                <TableCell align='right'> כמות </TableCell>
                <TableCell align='right'> מחיר </TableCell>
                <TableCell align='right'> . </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bag.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell align='right'>
                    {row.name} <img src={row.image} width='80px' alt={row.name} />
                  </TableCell>
                  <TableCell align='right'>
                    <TextField
                      type='number'
                      value={row.amount}
                      onChange={(e) => handleAmountChange(index, Number(e.target.value))}
                    />
                  </TableCell>
                  <TableCell align='right'>
                    {(row.price * row.amount).toFixed(2)} ₪
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton
                      aria-label='הסרת המוצר'
                      onClick={() => handleRemove(index)}
                    >
                      <DeleteForever />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCell colSpan={3} className='total_line'>
              סכום לתשלום {total.toFixed(2)} ₪
            </TableCell>
          </Table>
          <Button
            onClick={handlePaymentClick}
            startIcon={<ArrowBackIosIcon />}
            style={{ textTransform: 'none' }}
            size='large'
          >
            לתשלום
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
