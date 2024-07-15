import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { IProduct } from "../interfaces/IProduct";
import { IComponent } from "../interfaces/IComponent";
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { addItem } from "../Api-Requests/genericRequests";

const AddProductForm = () => {
    const productSchema = yup.object().shape({
        productName: yup.string().required("productName is a required field").min(3, "productName must be at least 3 characters").max(20, "productName must be at most 20 characters"),
        productDescription: yup.string().required("productDescription is a required field"),
        packageCost: yup.number().typeError("packageCost must be a number").required("packageCost is a required field").min(0, "package cost must be positive"),
        productComponents: yup.string().required("productComponents is a required field"),
        totalPrice: yup.number().typeError("totalPrice must be a number").required("totalPrice is a required field").min(1, "price must be positive"),
        adminId: yup.string().required("adminId is a required field"),
        isActive: yup.boolean().required("isActive is a required field"),
        isOnSale: yup.boolean().required("isOnSale is a required field"),
        salePercentage: yup.number().typeError("salePercentage must be a number").min(0).max(100).required("salePercentage is a required field"),
        stockQuantity: yup.number().typeError("stockQuantity must be a number").required("stockQuantity is a required field").min(0, "stock cannot be negative"),
        bussinesId: yup.string().required("bussinesId is a required field"),
        componentStatus: yup.string().required("componentStatus is a required field").min(3, "componentStatus must be at least 3 characters").max(15, "componentStatus must be at most 15 characters"),
        componentsImages: yup.array().of(yup.string()).min(1, "must be at least 1").max(5, "must be at most 5")
    });

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<IProduct>({
        resolver: yupResolver(productSchema)
    });

    const onSubmit: SubmitHandler<IProduct> = async (data) => {
        console.log("submit");
        const formData = new FormData();
        formData.append('productName', data.productName);
        formData.append('productDescription', data.productDescription);
        if (data.componentsImages) {
            data.componentsImages.forEach((image) => {
                formData.append('componentsImages', image);
            });
        }
        formData.append('totalPrice', data.totalPrice.toString());
        formData.append('packageCost', data.packageCost.toString());
        formData.append('productComponents', JSON.stringify(data.productComponents.split(",").map(s => s.trim())));
        formData.append('adminId', data.adminId);
        formData.append('isActive', data.isActive.toString());
        formData.append('isOnSale', data.isOnSale.toString());
        formData.append('salePercentage', data.salePercentage.toString());
        formData.append('stockQuantity', data.stockQuantity.toString());
        formData.append('bussinesId', data.bussinesId);
        formData.append('componentStatus', data.componentStatus);

        // try {
        //     const response = await addItem<FormData>('api/inventory/product', formData);
        //     console.log('Product added successfully:', response.data);
        // } catch (error) {
        //     console.error('Error adding product:', error);
        // }

        try {
            data.productComponents = data.productComponents.split(",").map(s => s.trim());
            const response = await addItem<IProduct>('api/inventory/product', data);
            console.log('Product added successfully:', response.data);
        } catch (error) {
            console.error('Error adding product:', error);
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
        // if (event.target.files) {
        //     const images = Array.from(event.target.files).map(file => URL.createObjectURL(file));
        //     setValue("componentsImages", images);
        // }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="on">
            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    id="productName-input"
                    label="productName"
                    variant="outlined"
                    error={!!errors.productName}
                    helperText={errors.productName?.message}
                    {...register("productName")}
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    id="description-input"
                    label="productDescription"
                    variant="outlined"
                    error={!!errors.productDescription}
                    helperText={errors.productDescription?.message}
                    {...register("productDescription")}
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
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <TextField
                    id="bussinesId-input"
                    label="bussinesId"
                    variant="outlined"
                    error={!!errors.bussinesId}
                    helperText={errors.bussinesId?.message}
                    {...register("bussinesId")}
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
                />
            </Box>

            <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                <input type="file" multiple onChange={handleImageChange} />
                {errors.componentsImages && <p>{errors.componentsImages.message}</p>}
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
            <Button variant="contained" color="success" type="submit">שלח</Button>
        </form>
    );
}

export default AddProductForm;
