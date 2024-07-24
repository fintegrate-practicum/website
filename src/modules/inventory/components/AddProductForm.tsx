import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { IProduct } from "../interfaces/IProduct";
import { IComponent } from "../interfaces/IComponent";
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { addItem, getItemById, updateItem } from "../Api-Requests/genericRequests";
import { useParams } from "react-router-dom";

const AddProductForm = () => {

    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<IProduct | any>(null);

    const productSchema = yup.object().shape({
        name: yup.string().required("name is a required field").min(3, "name must be at least 3 characters").max(20, "name must be at most 20 characters"),
        description: yup.string().required("productDescription is a required field"),
        packageCost: yup.number().typeError("packageCost must be a number").required("packageCost is a required field").min(0, "package cost must be positive"),
        totalPrice: yup.number().typeError("totalPrice must be a number").required("totalPrice is a required field").min(1, "price must be positive"),
        adminId: yup.string().required("adminId is a required field"),
        isActive: yup.boolean().required("isActive is a required field"),
        isOnSale: yup.boolean().required("isOnSale is a required field"),
        salePercentage: yup.number().typeError("salePercentage must be a number").min(0).max(100).required("salePercentage is a required field"),
        stockQuantity: yup.number().typeError("stockQuantity must be a number").required("stockQuantity is a required field").min(0, "stock cannot be negative"),
        businessId: yup.string().required("bussinesId is a required field"),
        componentStatus: yup.string().required("componentStatus is a required field").min(3, "componentStatus must be at least 3 characters").max(15, "componentStatus must be at most 15 characters"),
        productComponents: yup.string().min(1, "must provide at least one component"),
        images: yup.array().of(yup.mixed()).min(1, "must be at least 1").max(5, "must be at most 5"),
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
                    delete fetchedProduct.data._id;
                    delete fetchedProduct.data.__v;
                    setProduct(fetchedProduct);
                    reset(fetchedProduct.data);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            }
        };
        fetchProduct();
    }, [productId, reset]);

    const onSubmit: SubmitHandler<IProduct> = async (data) => {
        if (typeof data.productComponents === 'string') {
            data.productComponents = data.productComponents.split(',').map(s => s.trim());

            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((item) => {
                        formData.append(key, item);
                    });
                } else {
                    formData.append(key, value.toString());
                }
            })

            //   התמונות בשליחת נכשלת fromData של השליחה
            // try {
            //     const response = await addItem<FormData>('api/inventory/product', formData);
            //     console.log('Product added successfully:', response.data);
            // } catch (error) {
            //     console.error('Error adding product:', error);
            // }

            if (product && productId) {
                try {
                    const response = await updateItem<IProduct>(`api/inventory/product`, productId, data);
                    console.log('Product updated successfully:', response.data);
                } catch (error) {
                    console.error('Error updating product:', error);
                }
            } else {
                try {
                    const response = await addItem<IProduct>('api/inventory/product', data);
                    console.log('Product added successfully:', response.data);
                } catch (error) {
                    console.error('Error adding product:', error);
                }
            }
        }
    }

    const productState = useSelector((state: any) => state.product);
    if (!productState || !productState.data) {
        return <div>אין נתונים זמינים</div>;
    }

    const productComponents = productState.data?.map((product: IProduct) => product.productComponents) || [];
    const sumArrComponent = () => {
        let sum = 0;
        productComponents.forEach((component: IComponent) => {
            sum += component.componentBuyPrice;
        });
        return sum;
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const images = Array.from(event.target.files).map(file => URL.createObjectURL(file));
            setValue("images", images);
        }
    };

    return (<>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="on">
            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...register("name")}
                    value={watch("name") || ""}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    id="description-input"
                    label="description"
                    variant="outlined"
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    {...register("description")}
                    value={watch("description") || ""}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    id="packageCost-input"
                    label="packageCost"
                    variant="outlined"
                    type="number"
                    error={!!errors.packageCost}
                    helperText={errors.packageCost?.message}
                    {...register("packageCost")}
                    value={watch("packageCost") || ""}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    id="totalPrice-input"
                    label="totalPrice"
                    variant="outlined"
                    type="number"
                    error={!!errors.totalPrice}
                    helperText={errors.totalPrice?.message}
                    {...register("totalPrice")}
                    value={watch("totalPrice") || ""}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    id="adminId-input"
                    label="adminId"
                    variant="outlined"
                    error={!!errors.adminId}
                    helperText={errors.adminId?.message}
                    {...register("adminId")}
                    value={watch("adminId") || ""}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    id="salePercentage-input"
                    label="salePercentage"
                    variant="outlined"
                    type="number"
                    error={!!errors.salePercentage}
                    helperText={errors.salePercentage?.message}
                    {...register("salePercentage")}
                    value={watch("salePercentage") || ""}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    id="stockQuantity-input"
                    label="stockQuantity"
                    variant="outlined"
                    type="number"
                    error={!!errors.stockQuantity}
                    helperText={errors.stockQuantity?.message}
                    {...register("stockQuantity")}
                    value={watch("stockQuantity") || ""}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    id="businessId-input"
                    label="businessId"
                    variant="outlined"
                    error={!!errors.businessId}
                    helperText={errors.businessId?.message}
                    {...register("businessId")}
                    value={watch("businessId") || ""}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    id="componentStatus-input"
                    label="componentStatus"
                    variant="outlined"
                    error={!!errors.componentStatus}
                    helperText={errors.componentStatus?.message}
                    {...register("componentStatus")}
                    value={watch("componentStatus") || ""}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    id="productComponents-input"
                    label="productComponents"
                    variant="outlined"
                    error={!!errors.productComponents}
                    helperText={errors.productComponents?.message}
                    {...register("productComponents")}
                    value={watch("productComponents") || ""}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <input type="file" multiple onChange={handleImageChange} />
                {errors.images && <p>{errors.images.message}</p>}
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <label>
                    isActive
                    <input type="checkbox" {...register("isActive")} />
                </label>
                {errors.isActive && <p>{errors.isActive.message}</p>}
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <label>
                    isOnSale
                    <input type="checkbox" {...register("isOnSale")} />
                </label>
                {errors.isOnSale && <p>{errors.isOnSale.message}</p>}
            </Box>

            {/* <Button variant="contained" color="success" onClick={() => navigate('/')}>בחר רכיבים</Button> */}
            <div>{sumArrComponent()}</div>
            <Button variant="contained" color="success" type="submit">
                {product?.id ? "Update" : "Add"}
            </Button>
        </form>
    </>
    );
}

export default AddProductForm;


