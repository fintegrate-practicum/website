import React, { useState } from 'react';
import {
  TextField,
  Box,
  Grid,
  Paper,
  SelectChangeEvent,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Typography from '../common/components/Typography/Typography';
import Button from '../common/components/Button/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { updateCurrentUser } from '../Redux/currentUserSlice';
import { statuses } from '../modules/workers/classes/enum/statuses.enum';
import { useTranslation } from 'react-i18next';

// Convert enum to array of strings
const statusArray = Object.keys(statuses).filter((key) => isNaN(Number(key)));
const EditProfile: React.FC = () => {
  const { t } = useTranslation();
  const currentUser = useAppSelector((state) => state.currentUserSlice);
  const [isEditing, setIsEditing] = useState(false);
  const [auth0_user_id] = useState(currentUser.userDetails.auth0_user_id);
  const [status, setStatus] = useState(String(currentUser.userDetails.status));
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: currentUser.userDetails.userEmail || '',
    name: currentUser.userDetails.userName || '',
    role: currentUser.employeeDetails.role.type || '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    setIsEditing(false);
    const updatedCurrentUser = {
      employee: {
        ...currentUser.employeeDetails,
        role: { ...currentUser.employeeDetails.role, type: formData.role },
      },
      user: {
        ...currentUser.userDetails,
        userEmail: formData.email,
        userName: formData.name,
        status: status,
      },
    };
    const newData = {
      auth0_user_id,
      updatedCurrentUser,
    };
    dispatch(updateCurrentUser(newData));
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(formData.email);
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant='h4' gutterBottom>
          {t('auth0.Edit Profile')}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('auth0.Email')}
              name='email'
              value={formData.email}
              onChange={handleChange}
              disabled={true}
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
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('auth0.Name')}
              name='name'
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              variant='outlined'
              margin='normal'
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id='demo-simple-select-label'>
                {t('auth0.Status')}
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={status}
                label={t('auth0.Status')}
                onChange={handleChangeStatus}
                disabled={!isEditing}
              >
                {statusArray.map((statusOption, index) => (
                  <MenuItem key={index} value={statusOption}>
                    {statusOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label={t('auth0.Role')}
              name='role'
              value={formData.role}
              onChange={handleChange}
              disabled={!isEditing}
              variant='outlined'
              margin='normal'
              sx={{ mt: 2 }}
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
