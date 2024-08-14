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

const statusArray = Object.keys(statuses).filter((key) => isNaN(Number(key)));

const EditProfile: React.FC = () => {
  const { control, setValue, getValues } = useForm({
    defaultValues: {
      email: '',
      name: '',
      role: '',
      status: '',
    },
  });
  const currentUser = useAppSelector((state) => state.currentUserSlice);
  const [isEditing, setIsEditing] = React.useState(false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setValue('email', currentUser.userDetails.userEmail || '');
    setValue('name', currentUser.userDetails.userName || '');
    setValue('role', currentUser.employeeDetails.role.type || '');
    setValue('status', String(currentUser.userDetails.status));
  }, [currentUser, setValue]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    const updatedCurrentUser = {
      employee: {
        ...currentUser.employeeDetails,
        role: { ...currentUser.employeeDetails.role, type: getValues('role') },
      },
      user: {
        ...currentUser.userDetails,
        userEmail: getValues('email'),
        userName: getValues('name'),
        status: getValues('status'),
      },
    };
    const newData = {
      auth0_user_id: currentUser.userDetails.auth0_user_id,
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
          Edit Profile
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
                  label='Email'
                  disabled
                  variant='outlined'
                  margin='normal'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Tooltip title='Copy'>
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
                  label='Name'
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
                  <InputLabel id='status-select-label'>Status</InputLabel>
                  <Select
                    {...field}
                    labelId='status-select-label'
                    id='status-select'
                    value={field.value}
                    label='Status'
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
                  label='Role'
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
            <Button onClick={handleSaveClick}>Save</Button>
          ) : (
            <Button onClick={handleEditClick}>Edit</Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default EditProfile;
