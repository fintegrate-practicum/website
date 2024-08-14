import React, { useEffect, useMemo, useState } from "react";
import { Resolver, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { IComponent } from '../interfaces/IComponent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '../../../common/components/Button/Button'
import { addItem, getItemById, updateItem } from '../Api-Requests/genericRequests';
import './ComponentForm.css';
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { IProduct } from "../interfaces/IProduct.ts";

const notSaleAloneSchema = yup.object().shape({
    name: yup.string().required("Name is a required field").min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters"),
    componentBuyPrice: yup.number().required("Purchase price is a required field").positive("Price must be a positive number"),
    minQuantity: yup.number().required("Minimum quantity is a required field").positive("Quantity must be a positive number"),
    stockQuantity: yup.number().required("Stock is a required field").positive("Stock must be a positive number"),
    isActive: yup.boolean().required(),
    isSoldSeparately: yup.boolean().required(),
    componentColor: yup.string().optional(),
    componentSize: yup.string().optional(),
}) as unknown as yup.ObjectSchema<IComponent>;


const saleAloneSchema = yup.object().shape({
    name: yup.string().required("Name is a required field").min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters"),
    componentBuyPrice: yup.number().required("Purchase price is a required field").positive("Price must be a positive number"),
    minQuantity: yup.number().required("Minimum quantity is a required field").positive("Quantity must be a positive number"),
    stockQuantity: yup.number().required("Stock is a required field").positive("Stock must be a positive number"),
    isActive: yup.boolean().required(),
    isSoldSeparately: yup.boolean().required(),
    description: yup.string().required("Description is a required field"),
    totalPrice: yup.number().required("Sale price is a required field").positive("Price must be a positive number"),
    images: yup.array().of(yup.mixed()).required("Please select an image").min(1, "Must be at least 1").max(5, "Must be at most 5"),
    isOnSale: yup.boolean().required(),
    salePercentage: yup.number().required("Sale percentage is a required field").min(0, "Percentage must be positive"),
    componentColor: yup.string().nullable().notRequired(),
    componentSize: yup.string().nullable().notRequired(),
}) as unknown as yup.ObjectSchema<IComponent>;

export const ComponentForm = () => {

    const { componentId } = useParams<{ componentId: string }>();
    const [component, setComponent] = useState<IComponent | any>(null);
    const [isAloneChecked, setIsAloneChecked] = useState(component?.isSoldSeparately || false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const schema = useMemo(() => isAloneChecked ? saleAloneSchema : notSaleAloneSchema, [isAloneChecked]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<IComponent>({
        resolver: yupResolver(schema) as unknown as Resolver<IComponent>,
        defaultValues: component || {}
    });

    useEffect(() => {
        const fetchComponent = async () => {
            if (componentId) {
                try {
                    const fetchedComponent = await getItemById<any>(`api/inventory/component`, componentId);
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
            data.businessId = "here will be the business id";
            data.adminId = "here will be the admin id";
            if (component && componentId) {
                const response = await updateItem<IComponent>(`inventory/component`, componentId, data);
                console.log('Component updated successfully:', response.data);
            } else {
                const response = await addItem<IComponent>('inventory/component', data);
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
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);

            Promise.all(
                filesArray.map(file => {
                    return new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                            const base64String = reader.result as string;
                            resolve(base64String);
                        };
                        reader.onerror = error => reject(error);
                    });
                })
            ).then(base64Images => {
                setImagePreviews(base64Images);
                setValue("images", base64Images);
            }).catch(error => {
                console.error("Error converting images to Base64:", error);
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(save)} noValidate autoComplete="on">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={!!errors.name}
                        id="name-input"
                        label="Component Name"
                        variant="outlined"
                        helperText={errors.name?.message}
                        {...register("name")}
                        value={watch("name") || ""}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        type="number"
                        error={!!errors.componentBuyPrice}
                        id="componentBuyPrice-input"
                        label="Purchase Price"
                        variant="outlined"
                        helperText={errors.componentBuyPrice?.message}
                        {...register("componentBuyPrice")}
                        value={watch("componentBuyPrice") || ""}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        type="number"
                        error={!!errors.minQuantity}
                        id="minQuantity-input"
                        label="Minimum Quantity"
                        variant="outlined"
                        helperText={errors.minQuantity?.message}
                        {...register("minQuantity")}
                        value={watch("minQuantity") || ""}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        type="number"
                        error={!!errors.stockQuantity}
                        id="stockQuantity-input"
                        label="Stock"
                        variant="outlined"
                        helperText={errors.stockQuantity?.message}
                        {...register("stockQuantity")}
                        value={watch("stockQuantity") || ""}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        error={!!errors.componentColor}
                        id="componentColor-input"
                        label="Color"
                        variant="outlined"
                        helperText={errors.componentColor?.message}
                        {...register("componentColor")}
                        value={watch("componentColor") || ""}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        error={!!errors.componentSize}
                        id="componentSize-input"
                        label="Size"
                        variant="outlined"
                        helperText={errors.componentSize?.message}
                        {...register("componentSize")}
                        value={watch("componentSize") || ""}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12}>
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
                </Grid>

                {isAloneChecked && (
                    <>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={!!errors.description}
                                id="description-input"
                                label="Description"
                                variant="outlined"
                                helperText={errors.description?.message}
                                {...register("description")}
                                value={watch("description") || ""}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="number"
                                error={!!errors.totalPrice}
                                id="totalPrice-input"
                                label="Total Price"
                                variant="outlined"
                                helperText={errors.totalPrice?.message}
                                {...register("totalPrice")}
                                value={watch("totalPrice") || ""}
                                fullWidth
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={12}>
                            {imagePreviews.length > 0 && (
                                <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                                    <Grid item xs={12} sm={12}>
                                        {imagePreviews.map((preview, index) => (
                                            <img key={index} src={preview} alt={`Image ${index + 1}`} style={{ maxWidth: 200, maxHeight: 200 }} />
                                        ))}
                                    </Grid>
                                </Box>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <Button variant="contained" component="label" fullWidth>
                                Upload Images
                                <input
                                    type="file"
                                    hidden
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </Button>
                            {errors.images && <p style={{ color: 'red' }}>{errors.images.message}</p>}
                        </Grid>
                    </>
                )}

                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...register("isActive")}
                            />
                        }
                        label="Is Active"
                    />
                </Grid>

                {isAloneChecked && (
                    <>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        {...register("isOnSale")}
                                    />
                                }
                                label="Is On Sale"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                type="number"
                                error={!!errors.salePercentage}
                                id="salePercentage-input"
                                label="Sale Percentage"
                                variant="outlined"
                                helperText={errors.salePercentage?.message}
                                {...register("salePercentage")}
                                value={watch("salePercentage") || ""}
                                fullWidth
                            />
                        </Grid>
                    </>
                )}

                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};