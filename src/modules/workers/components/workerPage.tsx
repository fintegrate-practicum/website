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
import User from '../classes/user';
import React, { useState } from 'react';
import employee from '../classes/employee';
import UpdateEmployeeDetails from './updateEmployeeDetails';
import { useTranslation } from 'react-i18next';

interface WorkerPageProps {
  user: User;
  employee: employee;
}
const WorkerPage: React.FC<WorkerPageProps> = (props) => {
  const { t } = useTranslation();
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
          <Typography>
            {t('workers.Name')}: {props.user.userName}{' '}
          </Typography>
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
                primary={t('workers.Personal Information')}
                secondary={
                  <Typography>
                    {t('workers.dateOfBirth')}: {props.user.userName}
                    <br />
                    {t('workers.mobile')}: {props.user.mobile}
                    <br />
                    {t('workers.status')}: {props.user.status}
                  </Typography>
                }
              />
            </Grid>
          </ListItem>
        </List>
        <Button onClick={handleClickOpen}>{t('workers.Edit Details')}</Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{t('workers.Edit Details')}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t('workers.Edit Changes in Your Details and Save')}
            </DialogContentText>
            <UpdateEmployeeDetails />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{t('comoon.Cancel')}</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
};
export default WorkerPage;
