import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { IComponent } from '../interfaces/IComponent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { addItem } from '../Api-Requests/genericRequests';
import { addComponent } from '../features/component/componentSlice';
import './ComponentForm.css';

const notSaleAloneSchema = yup.object().shape({
    name: yup.string().required("name is a required field").min(3, "name must be at least 3 characters").max(20, "name must be at most 20 characters"),
    purchasePrice: yup.string().required("purchase price is a required field").matches(/^[0-9]+(\.[0-9]{1,2})?$/, "price must be a number"),
    isAlone: yup.boolean()
});


const saleAloneSchema = yup.object().shape({
    name: yup.string().required("name is a required field").min(3, "name must be at least 3 characters").max(20, "name must be at most 20 characters"),
    purchasePrice: yup.string().required("purchase price is a required field").matches(/^[0-9]+(\.[0-9]{1,2})?$/, "price must be a number"),
    isAlone: yup.boolean(),
    description: yup.string().required("description is a required field"),
    salePrice: yup.string()
        .required("sale price is a required field")
        .matches(/^[0-9]+(\.[0-9]{1,2})?$/, "price must be a number")
        .test('is-greater-than', 'sale price must be greater than purchase price', function (value) {
            const { purchasePrice } = this.parent;
            const parsedSalePrice = parseFloat(value);
            const parsedPurchasePrice = parseFloat(purchasePrice);
            return parsedSalePrice > parsedPurchasePrice || parsedSalePrice === 0;
        }),
    images: yup.array().of(yup.mixed()).min(1, "must be at least 1").max(5, "must be at most 5").required('please select an image')
});


export const ComponentForm: React.FC<IComponent> = () => {
    const dispatch = useDispatch();
    const [isAloneChecked, setIsAloneChecked] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const { register, handleSubmit, setValue, formState: { errors } } =
        useForm<IComponent>({ resolver: isAloneChecked ? yupResolver(saleAloneSchema ) : yupResolver(notSaleAloneSchema) as any});
    const save = async (data: IComponent) => {
        try {
            await addItem<IComponent>('component', data);
            dispatch(addComponent(data));
        } catch (error) {
            console.error(error);
        }
    };

    const handleIsAloneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAloneChecked(event.target.checked);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setSelectedFiles(Array.from(files));
            setValue('images', Array.from(files));
        }
    };

    return (
        <form onSubmit={handleSubmit(save)}>
        {!errors.name ?
            <form noValidate>
                <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                    <TextField id="outlined-basic" label="name" variant="outlined" {...register("name")} autoComplete="off" />
                </Box>
            </form>
            :
            <form noValidate>
                <Box className='itemInput' sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' } }}>
                    <TextField
                        error
                        id="outlined-error-helper-text"
                        label="name"
                        defaultValue="name"
                        helperText={errors.name.message}
                        {...register("name")}
                        autoComplete="off"
                    />
                </Box>
            </form>
        }
    
        {!errors.salePrice ?
            <form noValidate autoComplete="off">
                <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                    <TextField id="outlined-basic" label="purchase price" variant="outlined" {...register("salePrice")} />
                </Box>
            </form>
            :
            <form noValidate autoComplete="off">
                <Box className='itemInput' sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' } }}>
                    <TextField
                        error
                        id="outlined-error-helper-text"
                        label="purchase price"
                        defaultValue="purchasePrice"
                        helperText={errors.salePrice.message}
                        {...register("salePrice")}
                    />
                </Box>
            </form>
        }
    
        <label>can be sold separately</label>
        <input type="checkbox" {...register("isAlone")}
            checked={isAloneChecked}
            onChange={handleIsAloneChange} />
    
        {isAloneChecked && (
            <>
                {!errors.description ?
                    <form noValidate autoComplete="off">
                        <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                            <TextField id="outlined-basic" label="description" variant="outlined" {...register("description")} />
                        </Box>
                    </form>
                    :
                    <form noValidate autoComplete="off">
                        <Box className='itemInput' sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' } }}>
                            <TextField
                                error
                                id="outlined-error-helper-text"
                                label="description"
                                defaultValue="description"
                                helperText={errors.description.message}
                                {...register("description")}
                            />
                        </Box>
                    </form>
                }
    
                {!errors.salePrice ?
                    <form noValidate autoComplete="off">
                        <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
                            <TextField id="outlined-basic" label="sale price" variant="outlined" {...register("salePrice")} />
                        </Box>
                    </form>
                    :
                    <form noValidate autoComplete="off">
                        <Box className="itemInput" sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' } }}>
                            <TextField
                                error
                                id="outlined-error-helper-text"
                                label="sale price"
                                defaultValue="sale price"
                                helperText={errors.salePrice.message}
                                {...register("salePrice")}
                            />
                        </Box>
                    </form>
                }
    
                <label>images</label>
                <input type="file" multiple onChange={handleImageChange} />
                {errors.images && <p>{errors.images.message}</p>}
            </>
        )}
    
        <Button variant="outlined" type="submit">save</Button>
    
    </form>
    );
}




