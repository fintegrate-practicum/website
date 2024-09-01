import React, { useEffect, useMemo, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IComponent } from '../interfaces/IComponent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '../../../common/components/Button/Button';
import {
  addItem,
  getItemById,
  updateItem,
} from '../Api-Requests/genericRequests';
import './ComponentForm.css';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useParams } from 'react-router-dom';

const notSaleAloneSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .min(3, 'Name must be at least 3 characters')
    .max(20, 'Name must be at most 20 characters'),
  componentBuyPrice: yup
    .number()
    .required('Purchase price is a required field')
    .positive('Price must be a positive number'),
  minQuantity: yup
    .number()
    .required('Minimum quantity is a required field')
    .positive('Quantity must be a positive number'),
  stockQuantity: yup
    .number()
    .required('Stock is a required field')
    .positive('Stock must be a positive number'),
  isActive: yup.boolean().required(),
  isSoldSeparately: yup.boolean().required(),
  componentColor: yup.string().optional(),
  componentSize: yup.string().optional(),
}) as unknown as yup.ObjectSchema<IComponent>;

const saleAloneSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .min(3, 'Name must be at least 3 characters')
    .max(20, 'Name must be at most 20 characters'),
  componentBuyPrice: yup
    .number()
    .required('Purchase price is a required field')
    .positive('Price must be a positive number'),
  minQuantity: yup
    .number()
    .required('Minimum quantity is a required field')
    .positive('Quantity must be a positive number'),
  stockQuantity: yup
    .number()
    .required('Stock is a required field')
    .positive('Stock must be a positive number'),
  isActive: yup.boolean().required(),
  isSoldSeparately: yup.boolean().required(),
  description: yup.string().required('Description is a required field'),
  totalPrice: yup
    .number()
    .required('Sale price is a required field')
    .positive('Price must be a positive number'),
  images: yup
    .array()
    .of(yup.mixed())
    .required('Please select an image')
    .min(1, 'Must be at least 1')
    .max(5, 'Must be at most 5'),
  isOnSale: yup.boolean().required(),
  salePercentage: yup
    .number()
    .required('Sale percentage is a required field')
    .min(0, 'Percentage must be positive'),
  componentColor: yup.string().nullable().notRequired(),
  componentSize: yup.string().nullable().notRequired(),
}) as unknown as yup.ObjectSchema<IComponent>;

export const ComponentForm = () => {
  const { componentId } = useParams<{ componentId: string }>();
  const [component, setComponent] = useState<IComponent | any>(null);
  const [isAloneChecked, setIsAloneChecked] = useState(
    component?.isSoldSeparately || false,
  );
  const schema = useMemo(
    () => (isAloneChecked ? saleAloneSchema : notSaleAloneSchema),
    [isAloneChecked],
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IComponent>({
    resolver: yupResolver(schema) as unknown as Resolver<IComponent>,
    defaultValues: component || {},
  });

  useEffect(() => {
    const fetchComponent = async () => {
      if (componentId) {
        try {
          const fetchedComponent = await getItemById<any>(
            `api/inventory/component`,
            componentId,
          );
          const { _id, __v, ...dataToUpdate } = fetchedComponent.data;
          setComponent(dataToUpdate);
          reset(dataToUpdate);
        } catch (error) {
          console.error('Error fetching component:', error);
        }
      }
    };
    fetchComponent();
  }, [componentId, reset]);

  const save = async (data: IComponent) => {
    try {
      data.addingComponentDate = new Date();
      data.businessId = 'here will be the business id';
      data.adminId = 'here will be the admin id';
      if (component && componentId) {
        const response = await updateItem<IComponent>(
          `api/inventory/component`,
          componentId,
          data,
        );
        console.log('Component updated successfully:', response.data);
      } else {
        const response = await addItem<IComponent>(
          'api/inventory/component',
          data,
        );
        console.log('Component added successfully:', response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleIsAloneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAloneChecked(event.target.checked);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const files = event.target.files;
    // if (files) {
    //     const fileNames = Array.from(files).map(file => file.name);
    //     setSelectedFiles(Array.from(files));
    //     setValue('images', fileNames);
    // }
    if (event.target.files) {
      const images = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setValue('images', images);
    }
  };

  return (
    <form onSubmit={handleSubmit(save)} noValidate autoComplete='on'>
      <Box
        className='itemInput'
        sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}
      >
        <TextField
          error={!!errors.name}
          id='outlined-basic'
          label='Component Name'
          variant='outlined'
          helperText={errors.name?.message}
          {...register('name')}
          value={watch('name') || ''}
        />
      </Box>

      <Box
        className='itemInput'
        sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}
      >
        <TextField
          type='number'
          error={!!errors.componentBuyPrice}
          id='outlined-basic'
          label='Purchase Price'
          variant='outlined'
          helperText={errors.componentBuyPrice?.message}
          {...register('componentBuyPrice')}
          value={watch('componentBuyPrice') || ''}
        />
      </Box>

      <Box
        className='itemInput'
        sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}
      >
        <TextField
          type='number'
          error={!!errors.minQuantity}
          id='outlined-basic'
          label='Minimum Quantity'
          variant='outlined'
          helperText={errors.minQuantity?.message}
          {...register('minQuantity')}
          value={watch('minQuantity') || ''}
        />
      </Box>

      <Box
        className='itemInput'
        sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}
      >
        <TextField
          type='number'
          error={!!errors.stockQuantity}
          id='outlined-basic'
          label='Stock'
          variant='outlined'
          helperText={errors.stockQuantity?.message}
          {...register('stockQuantity')}
          value={watch('stockQuantity') || ''}
        />
      </Box>

      <Box
        className='itemInput'
        sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}
      >
        <TextField
          error={!!errors.componentColor}
          id='outlined-basic'
          label='Color'
          variant='outlined'
          helperText={errors.componentColor?.message}
          {...register('componentColor')}
          value={watch('componentColor') || ''}
        />
      </Box>

      <Box
        className='itemInput'
        sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}
      >
        <TextField
          error={!!errors.componentSize}
          id='outlined-basic'
          label='Size'
          variant='outlined'
          helperText={errors.componentSize?.message}
          {...register('componentSize')}
          value={watch('componentSize') || ''}
        />
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={isAloneChecked}
            {...register('isSoldSeparately')}
            onChange={handleIsAloneChange}
          />
        }
        label='Can be sold separately'
      />

      {isAloneChecked && (
        <>
          <Box
            className='itemInput'
            sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}
          >
            <TextField
              error={!!errors.description}
              id='outlined-basic'
              label='Description'
              variant='outlined'
              helperText={errors.description?.message}
              {...register('description')}
              value={watch('description') || ''}
            />
          </Box>

          <Box
            className='itemInput'
            sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}
          >
            <TextField
              type='number'
              error={!!errors.totalPrice}
              id='outlined-basic'
              label='total price'
              variant='outlined'
              helperText={errors.totalPrice?.message}
              {...register('totalPrice')}
              value={watch('totalPrice') || ''}
            />
          </Box>

          <Box
            className='itemInput'
            sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}
          >
            <input type='file' multiple onChange={handleImageChange} />
            {errors.images && <p>{errors.images.message}</p>}
          </Box>
        </>
      )}

      <FormControlLabel
        control={<Checkbox {...register('isActive')} />}
        label='Is Active'
      />

      {isAloneChecked && (
        <>
          <FormControlLabel
            control={<Checkbox {...register('isOnSale')} />}
            label='Is In Sale'
          />

          <Box
            className='itemInput'
            sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}
          >
            <TextField
              type='number'
              error={!!errors.salePercentage}
              id='outlined-basic'
              label='Sale Percentage'
              variant='outlined'
              helperText={errors.salePercentage?.message}
              {...register('salePercentage')}
              value={watch('salePercentage') || ''}
            />
          </Box>
        </>
      )}

      <Button type='submit' variant='contained' color='primary'>
        Submit
      </Button>
    </form>
  );
};
