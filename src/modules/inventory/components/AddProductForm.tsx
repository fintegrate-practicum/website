import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '../interfaces/IProduct';
import { IComponent } from '../interfaces/IComponent';
import TextField from '@mui/material/TextField';
// import * as yup from 'yup';
// import { yupResolver } from "@hookform/resolvers/yup";
import Button from '../../../common/components/Button/Button';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import {
  addItem,
  getAllItems,
  updateItem,
} from '../Api-Requests/genericRequests';
import {
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { RootState } from '../../../Redux/store';
import { getAllComponents } from '../features/component/componentSlice';
import { useTranslation } from 'react-i18next';

// const productSchema = yup.object().shape({
//     name: yup.string().required("name is a required field").min(3, "name must be at least 3 characters").max(20, "name must be at most 20 characters"),
//     description: yup.string().required("productDescription is a required field"),
//     images: yup.array().of(yup.string()).required("Images are required").min(1, "must be at least 1").max(5, "must be at most 5"),
//     packageCost: yup.number().typeError("packageCost must be a number").required("packageCost is a required field").min(0, "package cost must be positive"),
//     productComponents: yup.array().of(yup.string()).min(1, "Must select at least one component"),
//     totalPrice: yup.number().typeError("totalPrice must be a number").required("totalPrice is a required field").min(1, "price must be positive"),
//     adminId: yup.string().required("Admin ID is required"),
//     isActive: yup.boolean().required("isActive is a required field"),
//     isOnSale: yup.boolean().required("isOnSale is a required field"),
//     salePercentage: yup.number()
//         .when('isOnSale', {
//             is: true,
//             then: (schema) => schema
//                 .typeError("Sale percentage must be a number").min(0, "Sale percentage must be at least 0").max(100, "Sale percentage must be at most 100")
//                 .required("Sale percentage is a required field"), otherwise: (schema) => schema
//                     .notRequired()
//         }),
//     stockQuantity: yup.number().typeError("stockQuantity must be a number").required("stockQuantity is a required field").min(0, "stock cannot be negative"),
//     businessId: yup.string().required("Business ID is required"),
//     componentStatus: yup.string().required("componentStatus is a required field").min(3, "componentStatus must be at least 3 characters").max(15, "componentStatus must be at most 15 characters"),
// }) as unknown as yup.ObjectSchema<IProduct>;

const AddProductForm = () => {
  const { productId } = useParams<{ productId: string }>();
  const { t } = useTranslation();
  const [product] = useState<IProduct>();
  const [loading, setLoading] = useState<boolean>(false);
  const [components, setComponents] = useState<IComponent[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const dispatch = useDispatch();
  const componentState = useSelector((state: RootState) => state.component);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IProduct>({
    // resolver: yupResolver(productSchema),
    defaultValues: product || {},
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          // const fetchedProduct = await getItemById<string>(`api/inventory/product`, productId);
          // const { _id, __v, ...dataToUpdate } = fetchedProduct.data;
          // setProduct(dataToUpdate);
          // reset(dataToUpdate);
        } catch (error) {
          console.error(t('inventory.Error fetching product:'), error);
        }
      }
    };
    fetchProduct();
  }, [productId, reset]);

  useEffect(() => {
    if (!componentState.data || componentState.data.length === 0) {
      getComponents();
    } else {
      setComponents(componentState.data);
    }
  }, [componentState]);

  const getComponents = async () => {
    setLoading(true);
    try {
      const res = await getAllItems<IComponent[]>('api/inventory/component');
      dispatch(getAllComponents(res.data));
      setComponents(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    const componentIds = data.productComponents
      .map((name) => {
        const component = components.find((c) => c.name === name);
        return component ? component.id : null;
      })
      .filter((id): id is string => id !== null); // Filter out null values

    const newData = {
      ...data,
      businessId: t('here will be the business id'),
      adminId: t('here will be the admin id'),
      productComponents: componentIds,
      images: data.images,
    };
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, value.toString());
      }
    });

    if (product && productId) {
      try {
        const response = await updateItem<IProduct>(
          `api/inventory/product`,
          productId,
          newData,
        );
        console.log(
          t('inventory.Product updated successfully:'),
          response.data,
        );
      } catch (error) {
        console.error(t('inventory.Error updating product:'), error);
      }
    } else {
      try {
        const response = await addItem<IProduct>(
          'api/inventory/product',
          newData,
        );
        console.log(t('inventory.Product added successfully:'), response.data);
      } catch (error) {
        console.error(t('inventory.Error adding product:'), error);
      }
    }
  };

  if (loading) {
    return <div>{t('inventory.Loading...')}</div>;
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const images = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreviews(images);
      setValue('images', images);
    }
  };

  const handleComponentChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValue = event.target.value;
    const updatedValue = Array.isArray(selectedValue)
      ? selectedValue
      : [selectedValue];
    setValue('productComponents', updatedValue);
  };

  const handleIsOnSaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('isOnSale', event.target.checked);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='on'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id='name-input'
            label='Name'
            variant='outlined'
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name')}
            value={watch('name') || ''}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id='description-input'
            label='Description'
            variant='outlined'
            error={!!errors.description}
            helperText={errors.description?.message}
            {...register('description')}
            value={watch('description') || ''}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id='packageCost-input'
            label='Package Cost'
            variant='outlined'
            type='number'
            error={!!errors.packageCost}
            helperText={errors.packageCost?.message}
            {...register('packageCost')}
            value={watch('packageCost') || ''}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id='totalPrice-input'
            label='Total Price'
            variant='outlined'
            type='number'
            error={!!errors.totalPrice}
            helperText={errors.totalPrice?.message}
            {...register('totalPrice')}
            value={watch('totalPrice') || ''}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id='stockQuantity-input'
            label='Stock Quantity'
            variant='outlined'
            type='number'
            error={!!errors.stockQuantity}
            helperText={errors.stockQuantity?.message}
            {...register('stockQuantity')}
            value={watch('stockQuantity') || ''}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id='componentStatus-input'
            label='Component Status'
            variant='outlined'
            error={!!errors.componentStatus}
            helperText={errors.componentStatus?.message}
            {...register('componentStatus')}
            value={watch('componentStatus') || ''}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                {...register('isActive')}
                defaultChecked={product?.isActive || false}
              />
            }
            label='Is Active'
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                {...register('isOnSale')}
                defaultChecked={product?.isOnSale || false}
                onChange={handleIsOnSaleChange}
              />
            }
            label='Is On Sale'
          />
        </Grid>

        {watch('isOnSale') && (
          <Grid item xs={12} sm={6}>
            <TextField
              id='salePercentage-input'
              label='Sale Percentage'
              variant='outlined'
              type='number'
              error={!!errors.salePercentage}
              helperText={errors.salePercentage?.message}
              {...register('salePercentage')}
              defaultValue={product?.salePercentage || ''}
              fullWidth
            />
          </Grid>
        )}

        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel id='productComponents-label'>
              Product Components
            </InputLabel>
            <Select
              labelId='productComponents-label'
              id='productComponents-select'
              multiple
              value={watch('productComponents') || []}
              onChange={handleComponentChange}
              input={
                <OutlinedInput
                  id='select-multiple-chip'
                  label='Product Components'
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {components.map((component) => (
                <MenuItem key={component.id} value={component.name}>
                  {component.name}
                </MenuItem>
              ))}
            </Select>
            {errors.productComponents && (
              <p style={{ color: 'red' }}>{errors.productComponents.message}</p>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12}>
          {imagePreviews.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Image ${index + 1}`}
                  style={{ maxWidth: 200, maxHeight: 200 }}
                />
              ))}
            </Box>
          )}
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button component='label' fullWidth>
            Upload Images
            <input
              type='file'
              hidden
              multiple
              accept='image/*'
              onChange={handleImageChange}
            />
          </Button>
          {errors.images && (
            <p style={{ color: 'red' }}>{errors.images.message}</p>
          )}
        </Grid>

        <Grid item xs={12} sm={12}>
          <Button type='submit' fullWidth>
            {product ? 'Update Product' : 'Add Product'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddProductForm;
