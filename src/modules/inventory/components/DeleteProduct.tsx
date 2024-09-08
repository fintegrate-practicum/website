import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Button from '../../../common/components/Button/Button';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Toast from '../../../common/components/Toast/Toast';
import { deleteProduct as deleteProductFromState } from '../features/product/productSlice';
import { deleteItem } from '../Api-Requests/genericRequests';
import { IProduct } from '../interfaces/IProduct';

const DeleteProduct = ({ item }: { item: IProduct }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const dispatch = useDispatch();

  const handleDialogToggle = () => setOpen(!open);

  const deleteProduct = async () => {
    try {
      await deleteItem('api/inventory/product', item.id);
      dispatch(deleteProductFromState(item.id));
      setToast({
        open: true,
        message: t('inventory.The deletion was successful'),
        severity: 'success',
      });
    } catch (err) {
      console.log(err);
      setToast({
        open: true,
        message: t('inventory.Failed to delete product'),
        severity: 'error',
      });
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleDialogToggle} color='primary'>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleDialogToggle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {t('inventory.Are you sure you want to delete this product?')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {t('inventory.Product to delete')}: {item.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={handleDialogToggle}>
            {t('common.cancel')}
          </Button>
          <Button variant='text' onClick={deleteProduct} autoFocus>
            {t('inventory.delete')}
          </Button>
        </DialogActions>
      </Dialog>

      <Toast
        open={toast.open}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
      />
    </>
  );
};

export default DeleteProduct;
