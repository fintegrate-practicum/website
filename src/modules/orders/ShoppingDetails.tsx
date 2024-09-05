import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '../../common/components/Button/Button';
import { addItem } from './Api-Requests/genericRequests';
import { useTranslation } from 'react-i18next';
import Toast from '../../common/components/Toast/Toast';
const ShoppingDetails = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  );

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedOption(e.target.value);
  };

  const saveDetails = async (data: Record<string, any>) => {
    try {
      const response = await addItem('orders', data);
      setSnackbarMessage(t('order.Order saved successfully'));
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      console.log(response);
    } catch (err) {
      console.log(err);
      setSnackbarMessage(t('order.Error saving the order'));
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const backForm = yup.object().shape({
    city: yup.string().required(t('order.This field is required')),
    street: yup.string().required(t('order.This field is required')),
    buildingNumber: yup
      .number()
      .typeError(t('order.Enter a building number'))
      .positive(t('order.Enter a building number')),
    floor: yup
      .number()
      .typeError(t('order.Enter a floor number'))
      .positive(t('order.Enter a floor number')),
    apartmentNumber: yup
      .number()
      .typeError(t('order.Enter an apartment number'))
      .positive(t('order.Enter an apartment number')),
    lastName: yup.string().required(t('order.This field is required')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(backForm),
  });

  return (
    <>
      <form onSubmit={handleSubmit(saveDetails)}>
        <FormControl>
          <h3>{t('order.How would you like to receive the shipment')}</h3>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
            onChange={handleChange}
          >
            <FormControlLabel
              value='shipping'
              control={<Radio />}
              label={t('order.Shipping')}
            />
            <FormControlLabel
              value='selfCollection'
              control={<Radio />}
              label={t('order.Self Collection')}
            />
          </RadioGroup>
          {selectedOption === 'shipping' && (
            <Box
              sx={{
                '& > :not(style)': { m: 1, width: '25ch', display: 'block' },
              }}
            >
              <TextField
                id='filled-basic'
                fullWidth
                label={t('order.City')}
                variant='filled'
                {...register('city')}
              />
              {errors.city && <p>{errors.city.message}</p>}
              <TextField
                id='filled-basic'
                fullWidth
                label={t('order.Street')}
                variant='filled'
                {...register('street')}
              />
              {errors.street && <p>{errors.street.message}</p>}
              <TextField
                id='filled-basic'
                fullWidth
                label={t('order.Building Number')}
                variant='filled'
                type='number'
                {...register('buildingNumber')}
              />
              {errors.buildingNumber && <p>{errors.buildingNumber.message}</p>}
              <TextField
                id='filled-basic'
                fullWidth
                label={t('order.Floor')}
                variant='filled'
                type='number'
                {...register('floor')}
              />
              {errors.floor && <p>{errors.floor.message}</p>}
              <TextField
                id='filled-basic'
                fullWidth
                label={t('order.Apartment Number')}
                variant='filled'
                type='number'
                {...register('apartmentNumber')}
              />
              {errors.apartmentNumber && (
                <p>{errors.apartmentNumber.message}</p>
              )}
              <TextField
                id='filled-basic'
                fullWidth
                label={t('order.Last Name')}
                variant='filled'
                {...register('lastName')}
              />
              {errors.lastName && <p>{errors.lastName.message}</p>}
              <Button type='submit' variant='contained' color='primary'>
                {t('order.Save Details')}
              </Button>
            </Box>
          )}
        </FormControl>
      </form>

      <Toast
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        onClose={() => setSnackbarOpen(false)}
      />
    </>
  );
};

export default ShoppingDetails;
