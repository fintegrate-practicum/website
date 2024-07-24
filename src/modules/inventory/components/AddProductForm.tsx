import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../interfaces/IProduct";
import { IComponent } from "../interfaces/IComponent";
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { addItem, getAllItems, getItemById, updateItem } from "../Api-Requests/genericRequests";
import React, { useEffect, useState } from "react";
import { getProducts } from "../features/product/productSlice";
import { Chip, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, FormControl, FormControlLabel, Checkbox } from "@mui/material";
import { RootState } from "../../../Redux/store";
import { getAllComponents } from "../features/component/componentSlice";

interface Props {
    product?: IProduct;
}

const AddProductForm: React.FC<Props> = ({ product }) => {
    const productSchema = yup.object().shape({
        name: yup.string().required("productName is a required field").min(3, "productName must be at least 3 characters").max(20, "productName must be at most 20 characters"),
        description: yup.string().required("productDescription is a required field"),
        packageCost: yup.number().typeError("packageCost must be a number").required("packageCost is a required field").min(0, "package cost must be positive"),
        totalPrice: yup.number().typeError("totalPrice must be a number").required("totalPrice is a required field").min(1, "price must be positive"),
        adminId: yup.string().required("adminId is a required field"),
        isActive: yup.boolean().required("isActive is a required field"),
        isOnSale: yup.boolean().required("isOnSale is a required field"),
        salePercentage: yup.number().when('isOnSale', {
            is: true,
            then: yup.number().typeError("salePercentage must be a number").min(0).max(100).required("salePercentage is a required field"),
            otherwise: yup.number().notRequired()
        }),
        stockQuantity: yup.number().typeError("stockQuantity must be a number").required("stockQuantity is a required field").min(0, "stock cannot be negative"),
        businessId: yup.string().required("bussinesId is a required field"),
        componentStatus: yup.string().required("componentStatus is a required field").min(3, "componentStatus must be at least 3 characters").max(15, "componentStatus must be at most 15 characters"),
        productComponents: yup.array().of(yup.string()).min(1, "Must select at least one component"),
        images: yup.array().of(yup.string()).required("must be at least 1").min(1, "must be at least 1").max(5, "must be at most 5"),
    });

    const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm<IProduct>({
        resolver: yupResolver(productSchema)
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [components, setComponents] = useState<IComponent[]>([]);
    const dispatch = useDispatch();
    const componentState = useSelector((state: RootState) => state.component);

    useEffect(() => {
        if (product) {
            reset(product);
        }
    }, [product, reset]);

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
    }

    const onSubmit: SubmitHandler<IProduct> = async (data) => {
        
        console.log("before get product by id");
        const fetchedProduct = await getItemById<IProduct>(`api/inventory/product`, "669e66c58934ea5bb56090fa");
        console.log("fetched product", fetchedProduct)
        console.log("after get product by id");


        const componentIds = data.productComponents.map(name => {
            const component = components.find(c => c.name === name);
            return component ? component.id : null;
        }).filter((id): id is string => id !== null); // Filter out null values

        const formData = {
            ...data,
            productComponents: componentIds,
            images: data.images
        };

        if (product && product.id) {
            try {
                const response = await updateItem<IProduct>(`api/inventory/product`, product.id, formData);
                console.log('Product updated successfully:', response.data);
            } catch (error) {
                console.error('Error updating product:', error);
            }
        } else {
            try {
                const response = await addItem<IProduct>('api/inventory/product', formData);
                console.log('Product added successfully:', response.data);
            } catch (error) {
                console.error('Error adding product:', error);
            }
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const images = Array.from(event.target.files).map(file => URL.createObjectURL(file));
            setValue("images", images);
        }
    };

    const handleComponentChange = (event: SelectChangeEvent<string[]>) => {
        const selectedValue = event.target.value;
        const updatedValue = Array.isArray(selectedValue) ? selectedValue : [selectedValue];
        setValue("productComponents", updatedValue);
    }

    const handleIsOnSaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue("isOnSale", event.target.checked);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="on">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="name-input"
                        label="Name"
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        {...register("name")}
                        defaultValue={product?.name || ''}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="description-input"
                        label="Description"
                        variant="outlined"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        {...register("description")}
                        defaultValue={product?.description || ''}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="packageCost-input"
                        label="Package Cost"
                        variant="outlined"
                        type="number"
                        error={!!errors.packageCost}
                        helperText={errors.packageCost?.message}
                        {...register("packageCost")}
                        defaultValue={product?.packageCost || ''}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="totalPrice-input"
                        label="Total Price"
                        variant="outlined"
                        type="number"
                        error={!!errors.totalPrice}
                        helperText={errors.totalPrice?.message}
                        {...register("totalPrice")}
                        defaultValue={product?.totalPrice || ''}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="adminId-input"
                        label="Admin ID"
                        variant="outlined"
                        error={!!errors.adminId}
                        helperText={errors.adminId?.message}
                        {...register("adminId")}
                        defaultValue={product?.adminId || ''}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="stockQuantity-input"
                        label="Stock Quantity"
                        variant="outlined"
                        type="number"
                        error={!!errors.stockQuantity}
                        helperText={errors.stockQuantity?.message}
                        {...register("stockQuantity")}
                        defaultValue={product?.stockQuantity || ''}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="businessId-input"
                        label="Business ID"
                        variant="outlined"
                        error={!!errors.businessId}
                        helperText={errors.businessId?.message}
                        {...register("businessId")}
                        defaultValue={product?.businessId || ''}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        id="componentStatus-input"
                        label="Component Status"
                        variant="outlined"
                        error={!!errors.componentStatus}
                        helperText={errors.componentStatus?.message}
                        {...register("componentStatus")}
                        defaultValue={product?.componentStatus || ''}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        control={<Checkbox {...register("isActive")} defaultChecked={product?.isActive || false} />}
                        label="Is Active"
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        control={<Checkbox {...register("isOnSale")} defaultChecked={product?.isOnSale || false} onChange={handleIsOnSaleChange} />}
                        label="Is On Sale"
                    />
                </Grid>

                {watch("isOnSale") && (
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="salePercentage-input"
                            label="Sale Percentage"
                            variant="outlined"
                            type="number"
                            error={!!errors.salePercentage}
                            helperText={errors.salePercentage?.message}
                            {...register("salePercentage")}
                            defaultValue={product?.salePercentage || ''}
                            fullWidth
                        />
                    </Grid>
                )}

                <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                        <InputLabel id="productComponents-label">Product Components</InputLabel>
                        <Select
                            labelId="productComponents-label"
                            id="productComponents-select"
                            multiple
                            value={watch("productComponents") || []}
                            onChange={handleComponentChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Product Components" />}
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
                        {errors.productComponents && <p style={{ color: 'red' }}>{errors.productComponents.message}</p>}
                    </FormControl>
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

                <Grid item xs={12} sm={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {product ? "Update Product" : "Add Product"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default AddProductForm;
