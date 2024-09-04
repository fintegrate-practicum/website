import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Button from '../../../common/components/Button/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { deleteComponent as deleteComponentFromState } from '../features/component/componentSlice';
import { deleteItem } from '../Api-Requests/genericRequests';
import { IComponent } from '../interfaces/IComponent';
import { IconButton } from '@mui/material';
import Toast from '../../../common/components/Toast/Toast';

const DeleteComponent = ({ item }: { item: IComponent }) => {
    const [open, setOpen] = React.useState(false);
    const [toast, setToast] = React.useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteComponent = async () => {
        try {
            await deleteItem("api/inventory/component", item.id);
            setToast({
                open: true,
                message: "Component deleted successfully",
                severity: "success",
            });
            dispatch(deleteComponentFromState(item.id));
        } catch (err) {
            console.log(err);
            setToast({
                open: true,
                message: "Failed to delete component",
                severity: "error",
            });
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
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete this component?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Component to delete: {item.name}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={deleteComponent} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Toast
                open={toast.open}
                message={toast.message}
                severity={toast.severity}
                onClose={() => setToast((prevToast) => ({ ...prevToast, open: false }))}
                duration={6000}
            />
        </>
    );
};

export default DeleteComponent;
