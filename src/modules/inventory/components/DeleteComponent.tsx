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
import { IconButton, Snackbar, Alert } from '@mui/material';

const DeleteComponent = ({ item }: { item: IComponent }) => {
  const [open, setOpen] = React.useState(false);
  //this is temporarily here until the toast from story book is ready
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<
    'success' | 'error'
  >('success');
  //end temporary toast
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteComponent = async () => {
    try {
      await deleteItem('api/inventory/component', item.id);
      //this is temporarily here until the toast from story book is ready
      setSnackbarMessage('Component deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      //end temporary toast
      dispatch(deleteComponentFromState(item.id));
    } catch (err) {
      console.log(err);
      //this is temporarily here until the toast from story book is ready
      setSnackbarMessage('Failed to delete component');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      //end temporary toast
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
          Are you sure you want to delete this component?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={<Button onClick={() => setSnackbarOpen(false)}>Close</Button>}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteComponent;
