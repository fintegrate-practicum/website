import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { IProduct } from '../inventory/interfaces/IProduct';
import { getItemById, updateItem } from '../inventory/Api-Requests/genericRequests';
import { IComponent } from '../inventory/interfaces/IComponent';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './ConfirmeOrder.css';

const ConfirmOrder = () => {
  const { state } = useLocation();
  const { newOrder } = state;
  const { t } = useTranslation();

  const updateQuantity = async (id: string, qty: number) => {
    const updateStockQuantity = async (item: { stockQuantity: number }) => {
      if (item.stockQuantity >= qty) {
        item.stockQuantity -= qty;
        return true;
      } else {
        console.warn('Insufficient stock for item ID:', id);
        return false;
      }
    };

    try {
      const response = await getItemById<IProduct>(`/inventory/product`, id);
      if (response && response.data) {
        const { _id, __v, ...productToUpdate } = response.data;
        if (await updateStockQuantity(productToUpdate)) {
          try {
            await updateItem<IProduct>(`/inventory/product`, id, productToUpdate);
          } catch (error) {
            console.error('Failed to update product quantity:', error);
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch product details:', error);
      try {
        const response = await getItemById<IComponent>(`/inventory/component`, id);
        if (response && response.data) {
          const { _id, __v, ...componentToUpdate } = response.data;
          if (await updateStockQuantity(componentToUpdate)) {
            try {
              await updateItem<IComponent>(`/inventory/component`, id, componentToUpdate);
            } catch (error) {
              console.error('Failed to update component quantity:', error);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch component details:', error);
      }
    }
  };

  const updateInventory = async () => {
    for (const product of newOrder.products) {
      await updateQuantity(product.id, product.qty);
    }
  };

  useEffect(() => {
    updateInventory();
  }, []);

  
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
        <CheckCircleOutlineIcon sx={{ fontSize: '4rem', color: 'primary.main' }} />
        <Typography variant="h5" component="h2" sx={{ marginTop: '1rem', color: 'primary.main' }}>
          {t('order.Order number')}: {newOrder._id.$oid}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '1rem' }}>
          {t('order.was successfully received.')}
        </Typography>
        <Typography variant="body2" sx={{ marginTop: '1rem', color: 'text.secondary' }}>
          {t('order.A purchase confirmation email will be sent to the email registered in the system')}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ConfirmOrder;
