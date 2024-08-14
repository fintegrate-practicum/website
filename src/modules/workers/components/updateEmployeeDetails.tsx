import React, { useState } from 'react';
import TextField from '../../../common/component/TextField/TextField';
import { Box, Grid, Paper } from '@mui/material';
import Typography from '../../../common/components/Typography/Typography';
import Button from '../../../common/components/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { editEmployee } from '../features/employeeSlice';

const UpdateEmployeeDetails: React.FC = () => {
  const currentEmployee = useAppSelector(
    (state) => state.employeeSlice.currentEmployee,
  );
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    nameEmployee: currentEmployee?.nameEmployee || '',
    roleType: currentEmployee?.role?.type || '',
    roleDescription: currentEmployee?.role?.description || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    if (!currentEmployee) {
      console.error('No employee selected for update.');
      return;
    }
    setIsEditing(false);
    const updatedEmployee = {
      ...currentEmployee,
      role: {
        ...currentEmployee.role,
        type: formData.roleType,
        description: formData.roleDescription,
      },
    };

    dispatch(editEmployee(updatedEmployee));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant='h4' gutterBottom>
          Edit Employee Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Name'
              name='nameEmployee'
              value={formData.nameEmployee}
              onChange={handleChange}
              disabled={!isEditing}
              variant='outlined'
              margin='normal'
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Role Type'
              name='roleType'
              value={formData.roleType}
              onChange={handleChange}
              disabled={!isEditing}
              variant='outlined'
              margin='normal'
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Role Description'
              name='roleDescription'
              value={formData.roleDescription}
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
            <Button onClick={handleSaveClick}>Save</Button>
          ) : (
            <Button onClick={handleEditClick}>Edit</Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdateEmployeeDetails;
