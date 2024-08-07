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
import { deleteProduct as deleteProductFromState} from '../features/product/productSlice';
import { useTranslation } from "react-i18next";

const DeleteProduct = (
    {item}:any
) => {

    const { t } = useTranslation();
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
            const response = await deleteItem("product", item.id); 
            alert(t("The deletion was successful"));
            console.log(response);
        }
        catch (err) {
            console.log(err);
        }
        dispatch(deleteProductFromState(item.id));
        setOpen(false);
    }

    return (<>

        <Button variant="outlined" onClick={handleClickOpen} startIcon={<DeleteIcon />}>
            {t("Delete")}
        </Button>

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {t("Are you sure you want to delete this product?")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {t("Product code to delete:")}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={handleClose}>{t("cancel")}</Button>
                <Button variant="text" onClick={deleteProduct} autoFocus>
                    {t("delete")}
                </Button>
            </DialogActions>
        </Dialog>

    </>);
}

export default DeleteProduct;
