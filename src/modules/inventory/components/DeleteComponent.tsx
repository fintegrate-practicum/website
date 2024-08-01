import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Button from '@mui/material/Button';
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

const DeleteComponent = ({ item }: { item: IComponent }) => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteComponent = async () => {
        try {
            await deleteItem("component", item.id);
            alert("Component deleted successfully");
            dispatch(deleteComponentFromState(item.id));
        } catch (err) {
            console.log(err);
            alert("Failed to delete component");
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
                    {"Are you sure you want to delete this component?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Component ID to delete: {item.id}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={deleteComponent} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteComponent;
