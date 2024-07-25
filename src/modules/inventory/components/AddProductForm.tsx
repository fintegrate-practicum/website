import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IProduct } from '../interfaces/IProduct';
import { IComponent } from '../interfaces/IComponent';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { addItem } from "../Api-Requests/genericRequests";

const AddProductForm = () => {
    const productSchema = yup.object().shape({
        name: yup.string().required("productName is a required field").min(3, "productName must be at least 3 characters").max(20, "productName must be at most 20 characters"),
        description: yup.string().required("productDescription is a required field"),
        totalPrice: yup.number().typeError("price must be a number").required("purchase price is a required field"),
        // componentsImages: yup.array().of(yup.string()).min(1, "must be at least 1").max(5, "must be at most 5").required('please select an image')
        componentsImages: yup.array().of(yup.string()).min(1, "must be at least 1").max(5, "must be at most 5")
    });

    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm<IProduct>({ resolver: yupResolver(productSchema) });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<IProduct> = async (data) => {
        const formData = new FormData();
        formData.append('Name', data.name);
        formData.append('Description', data.description);
        formData.append('Price', data.totalPrice.toString());
        console.log(formData,"formData");
        if (data.componentsImages) {
            data.componentsImages.forEach((image) => {
                formData.append('componentsImages', image);
            });
        }
        try {
            // שליחת formData לשרת או פעולה אחרת שתרצה לבצע
            const response = await addItem<FormData>('api/inventory/product', formData);
            // הנחתה על טיפול בתגובה
            console.log('Product added successfully:', response.data);
            // נווט או עשה משהו אחר
            // navigate('/'); // דוגמה: נווט לדף אחר לאחר הצלחה
        } catch (error) {
            console.error('Error adding product:', error);
            // טיפול במקרה של שגיאה
        }
    }

    const productState = useSelector((state: any) => state.product);
    console.log(productState, "state");
    if (!productState || !productState.data) {
        // טיפול במקרה של undefined או העדר נתונים
        return <div>אין נתונים זמינים</div>;
      }
    const productComponents = productState.data?.map((product: IProduct) => product.productComponents)||[];

    const sumArrComponent = () => {
        let sum = 0;
        productComponents.forEach((component: IComponent) => {
            sum += component.componentBuyPrice;
        });
        return sum;
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // const files = event.target.files;
        // if (files) {
        //   setValue('componentsImages', files);
        // }
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                {!errors.name ?
                    <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' }, }}>
                        <TextField id="outlined-basic" label="name" variant="outlined" {...register("name")} />
                    </Box>
                    :
                    <Box className='itemInput' sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' }, }}>
                        <TextField
                            error
                            id="outlined-error-helper-text"
                            label="name"
                            defaultValue="name"
                            helperText={errors.name?.message}
                            {...register("name")}
                        />
                    </Box>
                }
                {!errors.description ?
                    <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' }, }}>
                        <TextField id="outlined-basic" label="description" variant="outlined" {...register("description")} />
                    </Box>
                    :
                    <Box className='itemInput' sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' }, }}>
                        <TextField
                            error
                            id="outlined-error-helper-text"
                            label="description"
                            defaultValue="description"
                            helperText={errors.description?.message}
                            {...register("description")}
                        />
                    </Box>
                }
                <Button variant="contained" color="success" onClick={() => navigate('/')}>בחר רכיבים</Button>
                {/* <div>{sumArrComponent()}</div> */}
                <input type="file" multiple onChange={handleImageChange} />
                {errors.componentsImages && <p>{errors.componentsImages.message}</p>}
                {!errors.totalPrice ?
                    <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' }, }}>
                        <TextField id="outlined-basic" label="price" variant="outlined" {...register("totalPrice")} />
                    </Box>
                    :
                    <Box className='itemInput' sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' }, }}>
                        <TextField
                            error
                            id="outlined-error-helper-text"
                            label="price"
                            defaultValue="price"
                            helperText={errors.totalPrice?.message}
                            {...register("totalPrice")}
                        />
                    </Box>
                }
                <Button variant="contained" color="success" type="submit">שלח</Button>
            </form>
        </>
    );
}
export default AddProductForm;