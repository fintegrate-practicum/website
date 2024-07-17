import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IProduct } from '../interfaces/IProduct';
import { IComponent } from '../interfaces/IComponent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
    const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

    const productSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        description: yup.string().required('Description is required'),
        componentsImages: yup.array().of(yup.string()).min(1, 'Select at least one image'),
        totalPrice: yup.number().required('Price is required'),
    });

    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm<IProduct>({ resolver: yupResolver(productSchema) as any });

    const dispatch = useDispatch();

    // Define the onSubmit function
    const onSubmit: SubmitHandler<IProduct> = async (data) => {
        // Handle form submission logic here
    };

    const navigate = useNavigate();

    const productState = useSelector((state: any) => state.product);
    const productComponents = productState.data.map((product: IProduct) => product.productComponents);

    const sumArrComponent = () => {
        let sum = 0;
        productComponents.forEach((component: IComponent) => {
            if (component.componentBuyPrice !== undefined) {
                sum += component.componentBuyPrice;
            }
        });
        return sum;
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const urls = Array.from(files).map(file => URL.createObjectURL(file));
            setValue('componentsImages', urls);
        }
    };

    // Return the JSX for the form
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {!errors.name ? (
                <Box className='itemInput' component="div">
                    <TextField id="outlined-basic" label="name" variant="outlined" {...register("name")} />
                </Box>
            ) : (
                <Box className='itemInput' component="div">
                    <TextField
                        error
                        id="outlined-error-helper-text"
                        label="name"
                        defaultValue="name"
                        helperText={errors.name?.message}
                        {...register("name")}
                    />
                </Box>
            )}

            {/* Repeat similar Box components for other form fields as needed */}

            <Button variant="contained" color="success" type="submit">Submit</Button>
        </form>
    );
};

export default AddProductForm;