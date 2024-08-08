import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '../../../common/components/Button/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteItem } from '../Api-Requests/genericRequests';
import { useDispatch } from 'react-redux';
import { deleteProduct as deleteProductFromState } from '../features/product/productSlice';
import Toast from '../../../stories/Toast';

const DeleteProduct = ({ item }: any) => {
    const [open, setOpen] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastSeverity, setToastSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('info');
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleToastClose = () => {
        setToastOpen(false);
    };

    const deleteProduct = async () => {
        try {
            const response = await deleteItem("product", item.id);
            setToastMessage('המחיקה בוצעה בהצלחה');
            setToastSeverity('success');
            setToastOpen(true);
            console.log(response);
        } catch (err) {
            setToastMessage('שגיאה במחיקה');
            setToastSeverity('error');
            setToastOpen(true);
            console.log(err);
        }
        dispatch(deleteProductFromState(item.id));
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen} startIcon={<DeleteIcon />}>
                Delete
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this product?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Product code to delete: {item.id}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" onClick={handleClose}>cancel</Button>
                    <Button variant="text" onClick={deleteProduct} autoFocus>
                        delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Toast
                open={toastOpen}
                message={toastMessage}
                severity={toastSeverity}
                onClose={handleToastClose}
            />
        </>
    );
};

export default DeleteProduct;
