import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Button from '../../../common/components/Button/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteProduct as deleteProductFromState } from '../features/product/productSlice';
import { deleteItem } from '../Api-Requests/genericRequests';
import { IProduct } from '../interfaces/IProduct';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Toast from '../../../common/components/Toast/Toast'; 

const DeleteProduct = ({ item }: { item: IProduct }) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [toastSeverity, setToastSeverity] = React.useState<
    'success' | 'error'
  >('success');
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteProduct = async () => {
    try {
      await deleteItem('api/inventory/product', item.id);
      setToastMessage(t('inventory.The deletion was successful'));
      setToastSeverity('success');
      setToastOpen(true);
      dispatch(deleteProductFromState(item.id));
    } catch (err) {
      console.log(err);
      setToastMessage(t('inventory.Failed to delete product'));
      setToastSeverity('error');
      setToastOpen(true);
    }
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} color='primary'>
        <DeleteIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {t('inventory.Are you sure you want to delete this product?')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Product to delete: {item.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='text' onClick={handleClose}>
            {t('common.cancel')}
          </Button>
          <Button variant='text' onClick={deleteProduct} autoFocus>
            {t('inventory.delete')}
          </Button>
        </DialogActions>
      </Dialog>

      <Toast
        open={toastOpen}
        onClose={() => setToastOpen(false)}
        message={toastMessage}
        severity={toastSeverity}
      />
    </>
  );
};

export default DeleteProduct;

