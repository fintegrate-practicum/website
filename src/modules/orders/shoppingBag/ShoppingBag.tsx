import React, { useEffect, useState } from 'react';
import './shoppingBag.css';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import TextField from '../../../common/component/TextField/TextField';
import Typography from '../../../common/components/Typography/Typography';
import Button from '../../../common/components/Button/Button'
import DeleteForever from '@mui/icons-material/DeleteForever';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { ICart } from '../interfaces/ICart';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../Redux/hooks';
import { deleteFromBasket, updateBasket } from '../features/basket/basketSlice';
import { deleteItem, updateItem } from '../Api-Requests/genericRequests';


const ShoppingBag: React.FC<{}> = () => {
  const [total, setTotal] = useState<number>(0);
  const bag = useAppSelector((state) => state.basketSlice?.data)
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
    if (window.confirm('האם ברצונך להסיר את המוצר?')) {
      dispatch(deleteFromBasket(cart_id));
      try {
        await deleteItem<ICart>('cart', cart_id)
      } catch (error) {

      }
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

        dispatch(updateBasket(updatedProduct));
        try {
          await updateItem<ICart>('cart', cart_id, updatedProduct)
        } catch (error) {

        }

      }
    }
  };

  return (
    <div className='shoppingBag-container'>
      {/* <Typography paragraph={true} variant='h5'> סל קניות </Typography> */}
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
                <TableCell align='right'>פרטים נוספים </TableCell>
                <TableCell align='right'> . </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bag.map((row, index) => (
                <TableRow key={row.product.name}>
                  <TableCell align='right'>
                    {row.product.name} <img src={row.image} width='80px' alt={""} />
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
                      aria-label='הסרת המוצר'
                      onClick={() => handleRemove(row.id)}
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
            onClick={() => alert('payment button was clicked')}
            variant='contained'
            endIcon={<ArrowBackIosIcon />}
            style={{ textTransform: 'none' }}
            size='large'
          >
            לתשלום
          </Button>
        </>
      )}
    </div>
  );
};

export default ShoppingBag;
