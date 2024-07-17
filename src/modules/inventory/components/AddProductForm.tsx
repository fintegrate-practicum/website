
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { IProduct } from "../interfaces/IProduct";
import { IComponent } from "../interfaces/IComponent";
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import  Button  from '@mui/material/Button';
import Box from '@mui/material/Box';

import React, { useState } from 'react';


const AddProductForm=()=>{
    const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

    const productSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        description: yup.string().required('Description is required'),
        componentsImages: yup.array().of(yup.string()).min(1, 'Select at least one image'),
        totalPrice: yup.number().required('Price is required'),
    });
    const { register, handleSubmit, setValue, formState: { errors } } =
    useForm<IProduct>({ resolver: yupResolver(productSchema) as any });
    const dispatch=useDispatch();
    const onSubmit: SubmitHandler<IProduct> = async (data) => {
      if (selectedImages) {
          try {
              const formData = new FormData();
              formData.append('Name', data.name);
              formData.append('Description', data.description);
              formData.append('Price', data.totalPrice.toString());
              Array.from(selectedImages).forEach((image) => {
                  formData.append('componentsImages', image);
              });
          } catch (error) {
              console.error('שגיאה בהוספת מוצר:', error);
              // טפל במקרה של שגיאה
          }
      } else {
          console.error("No images selected!");
      }
  };
    const navigate = useNavigate();
    const productState = useSelector((state: any) => state.product);
    const productComponents = productState.data.map((product: IProduct) => product.productComponents);
    const sumArrComponent=()=>{
      let sum=0;
      productComponents.forEach((component:IComponent)=>{
          sum+=component.componentBuyPrice
      })
      return sum;
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const urls = Array.from(files).map(file => URL.createObjectURL(file));
            setValue('componentsImages', urls);
        }
    };
    return (
         <form onSubmit={handleSubmit(onSubmit)}>
             {!errors.name?
                <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' }, }} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="name" variant="outlined" {...register("name")} />
                </Box>
                :
                <Box className='itemInput' sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' }, }} noValidate autoComplete="off">
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
                <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' }, }} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="description" variant="outlined" {...register("description")} />
                </Box>
                :
                <Box className='itemInput' sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' }, }} noValidate autoComplete="off">
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
            {errors.componentsImages && <p>{errors.componentsImages.message}</p>}
            {!errors.totalPrice ?
                <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' }, }} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="price" variant="outlined" {...register("totalPrice")} />
                </Box>
                :
                <Box className='itemInput' sx={{ '& .MuiTextField-root': { m: 1, width: '18ch' }, }} noValidate autoComplete="off">
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
}
export default AddProductForm;
