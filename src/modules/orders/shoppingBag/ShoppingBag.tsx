import React, { useEffect, useState } from 'react';
import './shoppingBag.css';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton,
} from '@mui/material';
import TextField from '../../../common/component/TextField/TextField';
import Typography from '../../../common/components/Typography/Typography';
import Button from '../../../common/components/Button/Button';
import DeleteForever from '@mui/icons-material/DeleteForever';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Toast from '../../../common/components/Toast/Toast';
import { ICart } from '../interfaces/ICart';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../Redux/hooks';
import { deleteFromBasket, updateBasket } from '../features/basket/basketSlice';
import { deleteItem, updateItem } from '../Api-Requests/genericRequests';

const ShoppingBag: React.FC<{}> = () => {
  const { t } = useTranslation();
  const initialBag = useAppSelector((state) => state.basketSlice?.data);
  const [bag, setBag] = useState<ICart[]>(initialBag || []);
  const [total, setTotal] = useState<number>(0);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
  const dispatch = useDispatch()

  useEffect(() => {
    calculateTotal();
  }, [bag]);


  const calculateTotal = () => {
    let sum = 0;
    bag.forEach(
      product =>
        sum += product.quantity * product.totalPrice
    )
    setTotal(sum);
  };

  const handleRemove = async (cart_id: string) => {
    if (window.confirm(t('order.confirmRemove'))) {
      try {
        await deleteItem<ICart>('cart', cart_id)
      } catch (error) {

      }
      dispatch(deleteFromBasket(cart_id));
      setBag(initialBag);
      setToastMessage(t('order.productRemoved'));
      setToastSeverity('warning');
      setToastOpen(true);
    }
  };

  const handleAmountChange = async (cart_id: string, newAmount: number) => {
    if (newAmount === 0) {
      handleRemove(cart_id);
    } else {
      const ProductToUpdate = bag.find(x => x.id === cart_id);
      if (ProductToUpdate !== undefined) {
        const updatedProduct = {
          ...ProductToUpdate,
          quantity: newAmount 
        };

        try {
          await updateItem<ICart>('cart', cart_id, updatedProduct)
          dispatch(updateBasket(updatedProduct));
        } catch (error) {

        }

      }
    }
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
                <TableRow key={row.product.name}>
                  <TableCell align='right'>
                    {row.name}{' '}
                    <img src={row.image} width='80px' alt={row.name} />
                  </TableCell>
                  <TableCell align='right'>
                    <TextField
                      type='number'
                      value={row.quantity}
                      onChange={(e) => handleAmountChange(row.id, Number(e.target.value))}
                    />
                  </TableCell>
                  <TableCell align='right'>
                    {row.totalPrice} ₪
                  </TableCell>
                  <TableCell align='right'>
                    {Object.entries(row.metadata).map(([key, value]) => (
                      <Typography key={key}>{`${key}: ${value}`}</Typography>
                    ))}
                  </TableCell>
                  <TableCell align='right'>
                    <IconButton
                      aria-label={t('order.removeProduct')}
                      onClick={() => handleRemove(row.id)}
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
            onClick={() => alert('payment button was clicked')}
            variant='contained'
            endIcon={<ArrowBackIosIcon />}
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
