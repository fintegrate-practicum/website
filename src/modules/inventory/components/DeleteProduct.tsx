import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Button from '../../../common/components/Button/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteItem } from '../Api-Requests/genericRequests';
import { useDispatch } from 'react-redux';
import { deleteProduct as deleteProductFromState } from '../features/product/productSlice';
import { IconButton } from '@mui/material';
import { IProduct } from '../interfaces/IProduct';
import { toast, ToastContainer } from 'react-toastify';


const DeleteProduct = ({ item }: { item: IProduct }) => {

    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteProduct = async () => {
        try {
            await deleteItem("product", item.id);
            toast.done("Product deleted successfully");
            dispatch(deleteProductFromState(item.id));
        }
        catch (err) {
            console.log(err);
            toast.error("Failed to delete product");
        }
        setOpen(false);
    }


    return (<>
        <IconButton onClick={handleClickOpen} color='primary'>
            <DeleteIcon />
        </IconButton>

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                "Are you sure you want to delete this product?"
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Product to delete:{item.name}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={handleClose}>cancel</Button>
                <Button
                    variant="text"
                    onClick={deleteProduct}
                    autoFocus>
                    delete
                </Button>
            </DialogActions>
        </Dialog>

        <ToastContainer />

    </>);
}

export default DeleteProduct;