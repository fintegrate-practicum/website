import React from 'react';
import TextField from '../common/component/TextField/TextField';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tooltip,
} from '@mui/material';
import Typography from '../common/components/Typography/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { updateCurrentUser } from '../Redux/currentUserSlice';
import { statuses } from '../modules/workers/classes/enum/statuses.enum';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const statusArray = Object.keys(statuses).filter((key) => isNaN(Number(key)));

const EditProfile: React.FC = () => {
  const { t } = useTranslation();
  const { control, setValue, getValues } = useForm({
    defaultValues: {
      email: '',
      name: '',
      mobile: '',
      status: '',
      role: '',
    },
  });
  const currentUser = useAppSelector((state) => state.currentUserSlice);
  const [isEditing, setIsEditing] = React.useState(false);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const businessId = queryParams.get('businessId');
  console.log('businessId', businessId);

  React.useEffect(() => {
    setValue('email', currentUser.userDetails.userEmail || '');
    setValue('name', currentUser.userDetails.userName || '');
    setValue('mobile', currentUser.userDetails.mobile || '');
    setValue('role', currentUser.employeeDetails.role.type || '');
    setValue('status', String(currentUser.userDetails.status));
  }, [currentUser, setValue]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log('currentUser',{currentUser});
    const updatedCurrentUser = {
      // employee: {
      //   ...currentUser.employeeDetails,
      //   role: { ...currentUser.employeeDetails.role, type: getValues('role') },
      // },
      // user: {
        ...currentUser.userDetails,
        userEmail: getValues('email'),
        userName: getValues('name'),
        mobile: getValues('mobile'),
        status: getValues('status'),
      // },
    };
    const newData = {
      auth0_user_id: currentUser.userDetails.auth0_user_id,
      businessId: businessId || '',
      updatedCurrentUser,
    };
    dispatch(updateCurrentUser(newData));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getValues('email'));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant='h4' gutterBottom>
          {t('auth0.Edit Profile')}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('auth0.Email')}
                  disabled
                  variant='outlined'
                  margin='normal'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Tooltip title={t('auth0.Copy')}>
                          <IconButton onClick={handleCopy}>
                            <ContentCopyIcon />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mt: 2 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('auth0.Name')}
                  disabled={!isEditing}
                  variant='outlined'
                  margin='normal'
                  sx={{ mt: 2 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='mobile'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('auth0.Mobile')}
                  disabled={!isEditing}
                  variant='outlined'
                  margin='normal'
                  sx={{ mt: 2 }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='status'
              control={control}
              render={({ field }) => (
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel id='status-select-label'>
                    {t('auth0.Status')}
                  </InputLabel>
                  <Select
                    {...field}
                    labelId='status-select-label'
                    id='status-select'
                    value={field.value}
                    label={t('auth0.Status')}
                    disabled={!isEditing}
                  >
                    {statusArray.map((statusOption, index) => (
                      <MenuItem key={index} value={statusOption}>
                        {statusOption}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='role'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={t('auth0.Role')}
                  disabled={!isEditing}
                  variant='outlined'
                  margin='normal'
                  sx={{ mt: 2 }}
                />
              )}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          {isEditing ? (
            <Button onClick={handleSaveClick}>{t('common.Save')}</Button>
          ) : (
            <Button onClick={handleEditClick}>{t('common.Edit')}</Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default EditProfile;
