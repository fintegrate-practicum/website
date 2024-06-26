import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { updateCurrentUser } from '../Redux/currentUserSlice';
import CurrentUser from '../classes/currentUser';

const EditProfile: React.FC = () => {  
  const currentUser = useAppSelector((state) => state.currentUserSlice.CurrentUser);  
  const [isEditing, setIsEditing] = useState(false);
  const [auth0_user_id, setAuth0_user_id] = useState(currentUser.userDetails.auth0_user_id);
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    email: currentUser.userDetails.userEmail || '',
    name: currentUser.userDetails.userName || '',
    phone: currentUser.userDetails.mobile || '',
    address: currentUser.userDetails.address || '',
    role: currentUser.employeeDetails.role.type || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const updatedCurrentUser:CurrentUser = {
    
    employee: {
      ...currentUser.employeeDetails,
      role: { ...currentUser.employeeDetails.role, type: formData.role },
      _id: undefined
    },
    user: {
      ...currentUser.userDetails,
      userEmail: formData.email,
      userName: formData.name,
      mobile: formData.phone,
      address: {
        ...currentUser.userDetails.address,
      }
    }
  };
  const handleSaveClick = () => {
    setIsEditing(false); 
    const newData={
      auth0_user_id,
      updatedCurrentUser
    }
    dispatch(updateCurrentUser(newData));        
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formData.email);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <TextField
      fullWidth
      label="Email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      disabled={true}
      variant="outlined"
      margin="normal"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title='copy'>
             <IconButton onClick={handleCopy}>
               <ContentCopyIcon />
             </IconButton>
            </Tooltip>
          </InputAdornment>
        )
      }}
    />

          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={!isEditing}
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          {isEditing ? (
            <Button variant="contained" color="primary" onClick={handleSaveClick}>
              Save
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleEditClick}>
              Edit
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
  
};

export default EditProfile;
