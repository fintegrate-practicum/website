import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../interfaces/IProduct";
import { IComponent } from "../interfaces/IComponent";
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import { addItem, getAllItems, getItemById, updateItem } from "../Api-Requests/genericRequests";
import { Chip, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, FormControl, FormControlLabel, Checkbox } from "@mui/material";
import { RootState } from "../../../Redux/store";
import { getAllComponents } from "../features/component/componentSlice";

const AddProductForm = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<IProduct | any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [components, setComponents] = useState<IComponent[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const dispatch = useDispatch();
    const componentState = useSelector((state: RootState) => state.component);

    const productSchema = yup.object().shape({
        name: yup.string().required("Name is a required field").min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters"),
        description: yup.string().required("Description is a required field"),
        packageCost: yup.number().typeError("Package cost must be a number").required("Package cost is a required field").min(0, "Package cost must be positive"),
        totalPrice: yup.number().typeError("Total price must be a number").required("Total price is a required field").min(1, "Total price must be positive"),
        isActive: yup.boolean().required("Is active is a required field"),
        isOnSale: yup.boolean().required("Is on sale is a required field"),
        salePercentage: yup.number()
          .typeError("Sale percentage must be a number")
          .when('isOnSale', {
            is: true,
            then: yup.number().min(0, "Sale percentage must be at least 0").max(100, "Sale percentage must be at most 100").required("Sale percentage is required"),
            otherwise: yup.number().notRequired()
          }),
        stockQuantity: yup.number().typeError("Stock quantity must be a number").required("Stock quantity is a required field").min(0, "Stock quantity must be positive"),
        componentStatus: yup.string().required("Component status is a required field").min(3, "Component status must be at least 3 characters").max(15, "Component status must be at most 15 characters"),
        productComponents: yup.array().of(yup.string()).min(1, "Must select at least one component"),
        images: yup.array().of(yup.string().required('Must provide at least one image')).min(1, "Must provide at least one image").max(5, "Must provide at most 5 images"),
      });
      

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<IProduct>({
        resolver: yupResolver(productSchema),
        defaultValues: product || {}
    });

    useEffect(() => {
        const fetchProduct = async () => {
            if (productId) {
                try {
                    const fetchedProduct = await getItemById<any>(`api/inventory/product`, productId);
                    const upDateProduct = fetchedProduct;
                    delete upDateProduct.data._id;
                    delete upDateProduct.data.__v;
                    setProduct(upDateProduct);
                    reset(upDateProduct.data);
                } catch (error) {
                    console.error('Error fetching product:', error);
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
    }

    const onSubmit: SubmitHandler<IProduct> = async (data) => {
        const componentIds = data.productComponents.map(name => {
            const component = components.find(c => c.name === name);
            return component ? component.id : null;
        }).filter((id): id is string => id !== null); // Filter out null values

        const newData = {
            ...data,
            businessId: "here will be the business id",
            adminId: "here will be the admin id",
            productComponents: componentIds,
            images: data.images
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
                const response = await updateItem<IProduct>(`api/inventory/product`, productId, newData);
                console.log('Product updated successfully:', response.data);
            } catch (error) {
                console.error('Error updating product:', error);
            }
        } else {
            try {
                const response = await addItem<IProduct>('api/inventory/product', newData);
                console.log('Product added successfully:', response.data);
            } catch (error) {
                console.error('Error adding product:', error);
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const images = Array.from(event.target.files).map(file => URL.createObjectURL(file));
            setImagePreviews(images);
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
                        value={watch("name") || ""}
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
                        value={watch("description") || ""}
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
                        value={watch("packageCost") || ""}
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
                        value={watch("totalPrice") || ""}
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
                        value={watch("stockQuantity") || ""}
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
                        value={watch("componentStatus") || ""}
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
                    {imagePreviews.length > 0 && (
                        <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                            {imagePreviews.map((preview, index) => (
                                <img key={index} src={preview} alt={`Image ${index + 1}`} style={{ maxWidth: 200, maxHeight: 200 }} />
                            ))}
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


// import React, { useEffect, useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import TextField from '@mui/material/TextField';
// import * as yup from 'yup';
// import { yupResolver } from "@hookform/resolvers/yup";
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import { useParams } from "react-router-dom";
// import { addItem, getAllItems, getItemById, updateItem } from "../Api-Requests/genericRequests";
// import { Chip, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, FormControl, FormControlLabel, Checkbox } from "@mui/material";
// import { RootState } from "../../../Redux/store";
// import { getAllComponents } from "../features/component/componentSlice";
// import { IProduct } from "../interfaces/IProduct";
// import { IComponent } from "../interfaces/IComponent";

// const AddProductForm = () => {
//     const { productId } = useParams<{ productId: string }>();
//     const [product, setProduct] = useState<IProduct | any>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [components, setComponents] = useState<IComponent[]>([]);
//     const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//     const [isOnSale, setIsOnSale] = useState<boolean>(false);
//     const [submitted, setSubmitted] = useState<boolean>(false);
//     const dispatch = useDispatch();
//     const componentState = useSelector((state: RootState) => state.component);

//     const validationSchema = yup.object().shape({
//         name: yup.string().required("Name is a required field").min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters"),
//         description: yup.string().required("Description is a required field"),
//         packageCost: yup.number().typeError("Package cost must be a number").required("Package cost is a required field").min(0, "Package cost must be positive"),
//         totalPrice: yup.number().typeError("Total price must be a number").required("Total price is a required field").min(1, "Total price must be positive"),
//         isActive: yup.boolean().required("Is active is a required field"),
//         isOnSale: yup.boolean().required("Is on sale is a required field"),
//         salePercentage: yup.number()
//             .typeError("Sale percentage must be a number")
//             .when('isOnSale', {
//                 is: true,
//                 then: yup.number().min(0, "Sale percentage must be at least 0").max(100, "Sale percentage must be at most 100").required("Sale percentage is required"),
//                 otherwise: yup.number().notRequired()
//             }),
//         stockQuantity: yup.number().typeError("Stock quantity must be a number").required("Stock quantity is a required field").min(0, "Stock quantity must be positive"),
//         componentStatus: yup.string().required("Component status is a required field").min(3, "Component status must be at least 3 characters").max(15, "Component status must be at most 15 characters"),
//         productComponents: yup.array().of(yup.string()).min(1, "Must select at least one component"),
//         images: yup.array().of(yup.string().required('Must provide at least one image')).min(1, "Must provide at least one image").max(5, "Must provide at most 5 images"),
//     });

//     const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<IProduct>({
//         resolver: yupResolver(validationSchema),
//         mode: 'onSubmit',
//         defaultValues: product || {}
//     });

//     useEffect(() => {
//         const fetchProduct = async () => {
//             if (productId) {
//                 try {
//                     const fetchedProduct = await getItemById<any>(`api/inventory/product`, productId);
//                     const upDateProduct = fetchedProduct;
//                     delete upDateProduct.data._id;
//                     delete upDateProduct.data.__v;
//                     setProduct(upDateProduct);
//                     reset(upDateProduct.data);
//                 } catch (error) {
//                     console.error('Error fetching product:', error);
//                 }
//             }
//         };
//         fetchProduct();
//     }, [productId, reset]);

//     useEffect(() => {
//         if (!componentState.data || componentState.data.length === 0) {
//             getComponents();
//         } else {
//             setComponents(componentState.data);
//         }
//     }, [componentState]);

//     const getComponents = async () => {
//         setLoading(true);
//         try {
//             const res = await getAllItems<IComponent[]>('api/inventory/component');
//             dispatch(getAllComponents(res.data));
//             setComponents(res.data);
//         } catch (err) {
//             console.log(err);
//         } finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         const updateSchema = () => {
//             setValue('salePercentage', watch('isOnSale') ? watch('salePercentage') : undefined);
//         };
//         updateSchema();
//     }, [watch('isOnSale'), setValue]);

//     const onSubmit: SubmitHandler<IProduct> = async (data) => {
//         setSubmitted(true);
//         const componentIds = data.productComponents.map(name => {
//             const component = components.find(c => c.name === name);
//             return component ? component.id : null;
//         }).filter((id): id is string => id !== null); // Filter out null values

//         const newData = {
//             ...data,
//             businessId: "here will be the business id",
//             adminId: "here will be the admin id",
//             productComponents: componentIds,
//             images: data.images
//         };
//         const formData = new FormData();
//         Object.entries(data).forEach(([key, value]) => {
//             if (Array.isArray(value)) {
//                 value.forEach((item) => {
//                     formData.append(key, item);
//                 });
//             } else {
//                 formData.append(key, value.toString());
//             }
//         });

//         if (product && productId) {
//             try {
//                 const response = await updateItem<IProduct>(`api/inventory/product`, productId, newData);
//                 console.log('Product updated successfully:', response.data);
//             } catch (error) {
//                 console.error('Error updating product:', error);
//             }
//         } else {
//             try {
//                 const response = await addItem<IProduct>('api/inventory/product', newData);
//                 console.log('Product added successfully:', response.data);
//             } catch (error) {
//                 console.error('Error adding product:', error);
//             }
//         }
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             const images = Array.from(event.target.files).map(file => URL.createObjectURL(file));
//             setImagePreviews(images);
//             setValue("images", images);
//         }
//     };

//     const handleComponentChange = (event: SelectChangeEvent<string[]>) => {
//         const selectedValue = event.target.value;
//         const updatedValue = Array.isArray(selectedValue) ? selectedValue : [selectedValue];
//         setValue("productComponents", updatedValue);
//     }

//     const handleIsOnSaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setIsOnSale(event.target.checked);
//         setValue("isOnSale", event.target.checked);
//         setValue("salePercentage", 0); // Reset salePercentage if not on sale
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="on">
//             <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         id="name-input"
//                         label="Name"
//                         variant="outlined"
//                         error={submitted && !!errors.name}
//                         helperText={submitted && errors.name?.message}
//                         {...register("name")}
//                         fullWidth
//                     />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         id="description-input"
//                         label="Description"
//                         variant="outlined"
//                         error={submitted && !!errors.description}
//                         helperText={submitted && errors.description?.message}
//                         {...register("description")}
//                         fullWidth
//                     />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         id="packageCost-input"
//                         label="Package Cost"
//                         variant="outlined"
//                         type="number"
//                         error={submitted && !!errors.packageCost}
//                         helperText={submitted && errors.packageCost?.message}
//                         {...register("packageCost")}
//                         fullWidth
//                     />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         id="totalPrice-input"
//                         label="Total Price"
//                         variant="outlined"
//                         type="number"
//                         error={submitted && !!errors.totalPrice}
//                         helperText={submitted && errors.totalPrice?.message}
//                         {...register("totalPrice")}
//                         fullWidth
//                     />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         id="stockQuantity-input"
//                         label="Stock Quantity"
//                         variant="outlined"
//                         type="number"
//                         error={submitted && !!errors.stockQuantity}
//                         helperText={submitted && errors.stockQuantity?.message}
//                         {...register("stockQuantity")}
//                         fullWidth
//                     />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         id="componentStatus-input"
//                         label="Component Status"
//                         variant="outlined"
//                         error={submitted && !!errors.componentStatus}
//                         helperText={submitted && errors.componentStatus?.message}
//                         {...register("componentStatus")}
//                         fullWidth
//                     />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <FormControlLabel
//                         control={<Checkbox {...register("isActive")} defaultChecked={product?.isActive || false} />}
//                         label="Is Active"
//                     />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <FormControlLabel
//                         control={<Checkbox {...register("isOnSale")} defaultChecked={product?.isOnSale || false} onChange={handleIsOnSaleChange} />}
//                         label="Is On Sale"
//                     />
//                 </Grid>

//                 {watch("isOnSale") && (
//                     <Grid item xs={12} sm={6}>
//                         <TextField
//                             id="salePercentage-input"
//                             label="Sale Percentage"
//                             variant="outlined"
//                             type="number"
//                             error={submitted && !!errors.salePercentage}
//                             helperText={submitted && errors.salePercentage?.message}
//                             {...register("salePercentage")}
//                             fullWidth
//                         />
//                     </Grid>
//                 )}

//                 <Grid item xs={12} sm={12}>
//                     <FormControl fullWidth>
//                         <InputLabel id="productComponents-label">Product Components</InputLabel>
//                         <Select
//                             labelId="productComponents-label"
//                             id="productComponents-select"
//                             multiple
//                             value={watch("productComponents") || []}
//                             onChange={handleComponentChange}
//                             input={<OutlinedInput id="select-multiple-chip" label="Product Components" />}
//                             renderValue={(selected) => (
//                                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                                     {selected.map((value) => (
//                                         <Chip key={value} label={value} />
//                                     ))}
//                                 </Box>
//                             )}
//                         >
//                             {components.map((component) => (
//                                 <MenuItem key={component.id} value={component.name}>
//                                     {component.name}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                         {submitted && errors.productComponents && <p style={{ color: 'red' }}>{errors.productComponents.message}</p>}
//                     </FormControl>
//                 </Grid>

//                 <Grid item xs={12} sm={12}>
//                     {imagePreviews.length > 0 && (
//                         <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
//                             {imagePreviews.map((preview, index) => (
//                                 <img key={index} src={preview} alt={`Image ${index + 1}`} style={{ maxWidth: 200, maxHeight: 200 }} />
//                             ))}
//                         </Box>
//                     )}
//                 </Grid>

//                 <Grid item xs={12} sm={12}>
//                     <Button variant="contained" component="label" fullWidth>
//                         Upload Images
//                         <input
//                             type="file"
//                             hidden
//                             multiple
//                             accept="image/*"
//                             onChange={handleImageChange}
//                         />
//                     </Button>
//                     {submitted && errors.images && <p style={{ color: 'red' }}>{errors.images.message}</p>}
//                 </Grid>

//                 <Grid item xs={12} sm={12}>
//                     <Button type="submit" variant="contained" color="primary" fullWidth>
//                         {product ? "Update Product" : "Add Product"}
//                     </Button>
//                 </Grid>
//             </Grid>
//         </form>
//     );
// }

// export default AddProductForm;

