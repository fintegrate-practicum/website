import { useState } from "react";
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

const AddProductForm=()=>{
  const productSchema = yup.object().shape({
    name: yup.string().required("productName is a required field").min(3, "productName must be at least 3 characters").max(20, "productName must be at most 20 characters"),
    description: yup.string().required("productDescription is a required field"),
    totalPrice: yup.string().required("purchase price is a required field").matches(/^[0-9]+(\.[0-9]{1,2})?$/, "price must be a number"),
    componentsImages: yup.array().min(1, "must be at least 1").max(5, "must be at most 5").required('please select an image')
});

  const { register, handleSubmit, setValue, formState: { errors } } =
  useForm<IProduct>({ resolver:  yupResolver(productSchema) });
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
        setValue('componentsImages', Array.from(files));
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
