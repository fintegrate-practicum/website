//אני אמורה ליצור כפתור שבלחיצתו יפתח דיאלוג - האם אתה בטוח ואם כן
// כפתור זה יפעיל פונקציה שתזמן את הפונקציה שמוחקת מהרידקס ואת הפונקציה שמוחקת מהדטה בייס


//לסדר צבעים וסגנון עיצוב לפי האתר
//לפני המיזוג לשים את הקומפוננטה במיקום המיועד לה 


//מאיפה אני מקבלת את הid של המוצר

import DeleteIcon from '@mui/icons-material/Delete';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteItem } from '../Api-Requests/genericRequests';
import { deleteItem as deleteFromRedux } from "../app/actions";
import { useDispatch } from 'react-redux';


const DeleteProduct = () => {

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
            // פונקציה למחיקה ממסד הנתונים 
            //   let response=await deleteItem("",""); 
            alert("המחיקה בוצעה בהצלחה")
            //     console.log(response);

        }
        catch (err) {
            console.log(err);
        }

        //מחיקה מהרידקס
        // dispatch(deleteFromRedux("",""))///מה לבכניס לכאן?
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