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
    const [toastOpen, setToastOpen] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState("");
    const [toastSeverity, setToastSeverity] = React.useState<"success" | "error">("success");
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
            setToastMessage("Component deleted successfully");
            setToastSeverity("success");
            setToastOpen(true);
            dispatch(deleteComponentFromState(item.id));
        } catch (err) {
            console.log(err);
            setToastMessage("Failed to delete component");
            setToastSeverity("error");
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
                open={toastOpen}
                message={toastMessage}
                severity={toastSeverity}
                onClose={() => setToastOpen(false)}
                duration={6000}
            />
        </>
    );
};

export default DeleteComponent;
