import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import TextField from '../../common/component/TextField/TextField';
import Button from '../../common/components/Button/Button';
import './ShoppingDetails.css';
import { addItem } from './Api-Requests/genericRequests';

const ShoppingDetails = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(e.target.value);
  };

  const saveDetails = async (data: Record<string, any>) => {
    try {
      const response = await addItem('orders', data);
      alert('ההזמנה נשמרה בהצלחה');
      console.log(response);
    } catch (err) {
      console.log(err);
      alert('הייתה שגיאה בשמירת ההזמנה');
    }
  };

  const backForm = yup.object().shape({
    city: yup.string().required('שדה זה הינו חובה'),
    street: yup.string().required('שדה זה הינו חובה'),
    buildingNumber: yup
      .number()
      .typeError('הכנס מספר בנין')
      .positive('הכנס מספר בנין'),
    floor: yup.number().typeError('הכנס קומה').positive('הכנס קומה'),
    apartmentNumber: yup
      .number()
      .typeError('הכנס מספר דירה')
      .positive('הכנס מספר דירה'),
    lastName: yup.string().required('שדה זה הינו חובה'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(backForm),
  });

  return (
    <form onSubmit={handleSubmit(saveDetails)}>
      <FormControl>
        <h3>איך תרצה לאסוף את המשלוח</h3>
        <RadioGroup
          row
          aria-labelledby='demo-row-radio-buttons-group-label'
          name='row-radio-buttons-group'
          onChange={handleChange}
        >
          <FormControlLabel
            value='shipping'
            control={<Radio />}
            label='משלוח'
          />
          <FormControlLabel
            value='selfCollection'
            control={<Radio />}
            label='איסוף עצמי'
          />
        </RadioGroup>
        {selectedOption === 'shipping' && (
          <Box
            // component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch', display: 'block' },
            }}
            // noValidate
            // autoComplete="off"
          >
            <TextField
              id='filled-basic'
              fullWidth
              label='עיר'
              variant='filled'
              {...register('city')}
            />
            {errors.city && <p>{errors.city.message}</p>}
            <TextField
              id='filled-basic'
              fullWidth
              label='רחוב'
              variant='filled'
              {...register('street')}
            />
            {errors.street && <p>{errors.street.message}</p>}
            <TextField
              id='filled-basic'
              fullWidth
              label='מספר בנין'
              variant='filled'
              type='number'
              {...register('buildingNumber')}
            />
            {errors.buildingNumber && <p>{errors.buildingNumber.message}</p>}
            <TextField
              id='filled-basic'
              fullWidth
              label='קומה'
              variant='filled'
              type='number'
              {...register('floor')}
            />
            {errors.floor && <p>{errors.floor.message}</p>}
            <TextField
              id='filled-basic'
              fullWidth
              label='מספר בית'
              variant='filled'
              type='number'
              {...register('apartmentNumber')}
            />
            {errors.apartmentNumber && <p>{errors.apartmentNumber.message}</p>}
            <TextField
              id='filled-basic'
              fullWidth
              label='משפחה'
              variant='filled'
              {...register('lastName')}
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
            <Button type='submit' variant='contained' color='primary'>
              שמור פרטים
            </Button>
          </Box>
        )}
      </FormControl>
    </form>
  );
};

export default ShoppingDetails;
