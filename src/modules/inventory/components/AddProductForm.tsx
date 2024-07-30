import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IProduct } from '../interfaces/IProduct';
import { IComponent } from '../interfaces/IComponent';
import  TextField  from '../../../common/component/TextField/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {
    const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

    const productSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        description: yup.string().required('Description is required'),
        images: yup.array().of(yup.string()).min(1, 'Select at least one image'),
        totalPrice: yup.number().required('Price is required'),
    });

    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm<IProduct>({ resolver: yupResolver(productSchema) as any });

    const dispatch = useDispatch();

    const onSubmit: SubmitHandler<IProduct> = async (data) => {

        if (selectedImages) {
            try {
                const formData = new FormData();
                formData.append('Name', data.name);
                formData.append('Description', data.description);
                formData.append('Price', data.totalPrice.toString());
                Array.from(selectedImages).forEach((image) => {
                    formData.append('images', image);
                });
            } catch (error) {
                console.error('שגיאה בהוספת מוצר:', error);
            }
        } else {
            console.error("No images selected!");
        }
    
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
        const fileNames = Array.from(files).map(file => file.name);
        setValue('images', fileNames);
    }
};

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
             {!errors.name?
                <Box component="div" className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' }, }} 
                // noValidate autoComplete="off"
                >
                    <TextField id="outlined-basic" label="name" variant="outlined" {...register("name")} />
                </Box>
                :
                <Box component="div" className='itemInput' sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' }, }}
                //  noValidate autoComplete="off"
                 >
                    <TextField
                        error
                        id="outlined-error-helper-text"
                        label="name"
                        defaultValue="name"
                        helperText={errors.name.message}
                        {...register("name")}
                    />
                </Box>
            }

           {!errors.description ?
                <Box component="div" className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' }, }} 
                // noValidate autoComplete="off"
                >
                    <TextField id="outlined-basic" label="description" variant="outlined" {...register("description")} />
                </Box>
                :
                <Box component="div" className='itemInput' sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' }, }}
                //  noValidate autoComplete="off"
                 >
                    <TextField
                        error
                        id="outlined-error-helper-text"
                        label="description"
                        defaultValue="description"
                        helperText={errors.description.message}
                        {...register("description")}
                    />
                </Box>
            }
            <Button variant="contained" color="success" onClick={()=>navigate('/')}>select components</Button>
            <div>{sumArrComponent()}</div>
            <input type="file" multiple onChange={handleImageChange} />
            {errors.images && <p>{errors.images.message}</p>}
            {!errors.totalPrice ?
                <Box component="div" className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' }, }}
                //  noValidate autoComplete="off"
                 >
                    <TextField id="outlined-basic" label="price" variant="outlined" {...register("totalPrice")} />
                </Box>
                :
                <Box component="div" className='itemInput' sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' }, }}
                //  noValidate autoComplete="off"
                 >
                    <TextField
                        error
                        id="outlined-error-helper-text"
                        label="price"
                        defaultValue="price"
                        helperText={errors.totalPrice.message}
                        {...register("totalPrice")}
                    />
                </Box>
            }
            <Button variant="contained" color="success" type="submit" >Submit</Button>
        </form>
    );

};

export default AddProductForm;