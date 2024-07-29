import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { IComponent } from '../interfaces/IComponent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { addItem, getAllItems, updateItem } from '../Api-Requests/genericRequests';
import './ComponentForm.css';
import { Checkbox, FormControlLabel } from "@mui/material";
import { getProducts } from "../features/product/productSlice";

const notSaleAloneSchema = yup.object().shape({
    name: yup.string().required("Name is a required field").min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters"),
    componentBuyPrice: yup.number().required("Purchase price is a required field").positive("Price must be a positive number"),
    minQuantity: yup.number().required("Minimum quantity is a required field").positive("Quantity must be a positive number"),
    stockQuantity: yup.number().required("Stock is a required field").positive("Stock must be a positive number"),
    isActive: yup.boolean().required(),
    adminId: yup.string().required(),
    isSoldSeparately: yup.boolean().required(),
    componentColor: yup.string().optional(),
    componentSize: yup.string().optional(),
    businessId: yup.string().required(),
});
const saleAloneSchema = yup.object().shape({
    name: yup.string().required("Name is a required field").min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters"),
    componentBuyPrice: yup.number().required("Purchase price is a required field").positive("Price must be a positive number"),
    minQuantity: yup.number().required("Minimum quantity is a required field").positive("Quantity must be a positive number"),
    stockQuantity: yup.number().required("Stock is a required field").positive("Stock must be a positive number"),
    isActive: yup.boolean().required(),
    adminId: yup.string().required(),
    isSoldSeparately: yup.boolean().required(),
    description: yup.string().required("Description is a required field"),
    totalPrice: yup.number().required("Sale price is a required field").positive("Price must be a positive number"),
    images: yup.array().of(yup.mixed()).required("Please select an image").min(1, "Must be at least 1").max(5, "Must be at most 5"),
    isOnSale: yup.boolean().required(),
    salePercentage: yup.number().required("Sale percentage is a required field").min(0, "Percentage must be positive"),
    componentColor: yup.string().nullable().notRequired(),
    componentSize: yup.string().nullable().notRequired(),
    businessId: yup.string().required(),
});

interface ComponentFormProps {
    initialData?: IComponent;
}

export const ComponentForm: React.FC<ComponentFormProps> = ({ initialData }) => {

    const dispatch = useDispatch();
    const [isAloneChecked, setIsAloneChecked] = useState(initialData?.isSoldSeparately || false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<IComponent>({
        resolver: yupResolver(isAloneChecked ? saleAloneSchema : notSaleAloneSchema),
        defaultValues: initialData || {}
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    const save = async (data: IComponent) => {
        console.log("submit");
        try {
            data.addingComponentDate = new Date();
            if (initialData) {
                const response = await updateItem<IComponent>(`api/inventory/component`, initialData.id, data);
                console.log('Component updated successfully:', response.data);
                // dispatch(updateComponent(data));
            } else {
                const response = await addItem<IComponent>('api/inventory/component', data);
                console.log('Component added successfully:', response.data);
                // dispatch(addComponent(data));
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
            const images = Array.from(event.target.files).map(file => URL.createObjectURL(file));
            setValue("images", images);
        }
    };
    return (
        <form onSubmit={handleSubmit(save)} noValidate autoComplete="on">
            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    error={!!errors.name}
                    id="outlined-basic"
                    label="Component Name"
                    variant="outlined"
                    helperText={errors.name?.message}
                    {...register("name")}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    type="number"
                    error={!!errors.componentBuyPrice}
                    id="outlined-basic"
                    label="Purchase Price"
                    variant="outlined"
                    helperText={errors.componentBuyPrice?.message}
                    {...register("componentBuyPrice")}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    type="number"
                    error={!!errors.minQuantity}
                    id="outlined-basic"
                    label="Minimum Quantity"
                    variant="outlined"
                    helperText={errors.minQuantity?.message}
                    {...register("minQuantity")}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    type="number"
                    error={!!errors.stockQuantity}
                    id="outlined-basic"
                    label="Stock"
                    variant="outlined"
                    helperText={errors.stockQuantity?.message}
                    {...register("stockQuantity")}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    error={!!errors.componentColor}
                    id="outlined-basic"
                    label="Color"
                    variant="outlined"
                    helperText={errors.componentColor?.message}
                    {...register("componentColor")}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    error={!!errors.componentSize}
                    id="outlined-basic"
                    label="Size"
                    variant="outlined"
                    helperText={errors.componentSize?.message}
                    {...register("componentSize")}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    error={!!errors.adminId}
                    id="outlined-basic"
                    label="Admin ID"
                    variant="outlined"
                    helperText={errors.adminId?.message}
                    {...register("adminId")}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    error={!!errors.businessId}
                    id="outlined-basic"
                    label="Business ID"
                    variant="outlined"
                    helperText={errors.businessId?.message}
                    {...register("businessId")}
                />
            </Box>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={isAloneChecked}
                        {...register("isSoldSeparately")}
                        onChange={handleIsAloneChange}
                    />
                }
                label="Can be sold separately"
            />

            {isAloneChecked && (
                <>
                    <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                        <TextField
                            error={!!errors.description}
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            helperText={errors.description?.message}
                            {...register("description")}
                        />
                    </Box>

                    <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                        <TextField
                            type="number"
                            error={!!errors.totalPrice}
                            id="outlined-basic"
                            label="Sale Price"
                            variant="outlined"
                            helperText={errors.totalPrice?.message}
                            {...register("totalPrice")}
                        />
                    </Box>

                    <label>Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                    />
                    {errors.images && <p>{errors.images.message}</p>}
                </>
            )}

            <FormControlLabel
                control={
                    <Checkbox
                        {...register("isActive")}
                    />
                }
                label="Is Active"
            />

            {isAloneChecked && (
                <>
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...register("isOnSale")}
                            />
                        }
                        label="Is In Sale"
                    />

                    <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                        <TextField
                            type="number"
                            error={!!errors.salePercentage}
                            id="outlined-basic"
                            label="Sale Percentage"
                            variant="outlined"
                            helperText={errors.salePercentage?.message}
                            {...register("salePercentage")}
                        />
                    </Box>
                </>
            )}

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};
