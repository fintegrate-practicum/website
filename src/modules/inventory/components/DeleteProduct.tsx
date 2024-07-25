import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteItem } from '../Api-Requests/genericRequests';
import { useDispatch } from 'react-redux';
import { deleteProduct as deleteProductFromState} from '../features/product/productSlice';



const DeleteProduct = ({item}:any) => {

    const [open, setOpen] = React.useState(false);
    let dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteProduct = async () => {
        try {
            let response=await deleteItem("product",item.id); 
            alert("המחיקה בוצעה בהצלחה")
            console.log(response);
        }
        catch (err) {
            console.log(err);
        }
        dispatch(deleteProductFromState(item.id))
        setOpen(false);
    }


    return (<>

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
                    Product code to delete:
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>cancel</Button>
                <Button
                    onClick={deleteProduct}
                    autoFocus>
                    delete
                </Button>
            </DialogActions>
        </Dialog>

    </>);
}

export default DeleteProduct;