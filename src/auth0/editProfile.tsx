import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { updateCurrentUser } from '../Redux/currentUserSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { statuses } from '../classes/user';

// Convert enum to array of strings
const statusArray = Object.keys(statuses).filter(key => isNaN(Number(key)));

const EditProfile: React.FC = () => {
  const currentUser = useAppSelector((state) => state.currentUserSlice.CurrentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [auth0_user_id, setAuth0_user_id] = useState(currentUser.userDetails.auth0_user_id);
  const [status, setStatus] = useState(String(currentUser.userDetails.status));
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: currentUser.userDetails.userEmail || '',
    city: currentUser.userDetails.address.city || '',
    name: currentUser.userDetails.userName || '',
    phone: currentUser.userDetails.mobile || '',
    role: currentUser.employeeDetails.role.type || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
        mobile: formData.phone,
        status: status,
        address: {
          ...currentUser.userDetails.address,
          city: formData.city
        }
      }
    };
    const newData = {
      auth0_user_id,
      updatedCurrentUser
    };
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
                    <Tooltip title='Copy'>
                      <IconButton onClick={handleCopy}>
                        <ContentCopyIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              variant="outlined"
              margin="normal"
              sx={{ mt: 2 }}
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
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!isEditing}
              variant="outlined"
              margin="normal"
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="status"
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
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={!isEditing}
              variant="outlined"
              margin="normal"
              sx={{ mt: 2 }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
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
