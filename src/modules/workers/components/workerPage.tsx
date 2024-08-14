import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Button from '../../../common/components/Button/Button';
import Typography from '../../../common/components/Typography/Typography';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import React, { useState } from 'react';
import UpdateEmployeeDetails from './updateEmployeeDetails';
import { UserDetails, EmployeeDetails } from '../../../Redux/currentUserSlice';

interface WorkerPageProps {
  user: UserDetails;
  employee: EmployeeDetails;
}

const WorkerPage: React.FC<WorkerPageProps> = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Stack
        spacing={4}
        direction='row-reverse'
        sx={{
          color: 'action.active',
          display: 'flex',
          justifyContent: 'flex-end',
          width: '90%',
          flexDirection: 'row',
        }}
      >
        <Badge color='secondary' badgeContent={0} showZero>
          <MailIcon />
        </Badge>
      </Stack>

      <Grid
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '80%',
          margin: 'auto',
          flexDirection: 'column',
        }}
        id='all'
      >
        <Grid style={{ textAlign: 'left', margin: 'none' }}>
          <Typography>Name:{props.user.userName}</Typography>
        </Grid>

        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          <ListItem alignItems='flex-start'>
            <ListItemAvatar>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
            </ListItemAvatar>
            <Grid
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '50%',
                margin: 'auto',
                flexDirection: 'column',
              }}
            >
              <ListItemText
                primary='Personal Information:'
                secondary={
                  <Typography component='span' variant='body2' color='black'>
                    {' '}
                    dateOfBirth {props.user.userName}
                    <br />
                    mobile:{props.user.mobile}
                    <br />
                    status:{props.user.status}
                  </Typography>
                }
              />
            </Grid>
          </ListItem>
        </List>
        <Button onClick={handleClickOpen}>לעריכה</Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>ערוך פרטים</DialogTitle>
          <DialogContent>
            <DialogContentText>ערוך שינויים בפרטיך ושמור</DialogContentText>
            <UpdateEmployeeDetails />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>בטל</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
};

export default WorkerPage;
