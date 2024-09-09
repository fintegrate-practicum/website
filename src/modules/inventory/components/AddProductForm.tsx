import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '../interfaces/IProduct';
import { IComponent } from '../interfaces/IComponent';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../common/components/Button/Button';
import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import { addItem, getAllItems, getItemById, updateItem } from "../Api-Requests/genericRequests";
import { Chip, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, FormControl, FormControlLabel, Checkbox } from "@mui/material";
import { RootState } from "../../../Redux/store";
import { getAllComponents } from "../features/component/componentSlice";

const productSchema = yup.object().shape({
    name: yup.string().required("name is a required field").min(3, "name must be at least 3 characters").max(20, "name must be at most 20 characters"),
    description: yup.string().required("productDescription is a required field"),
    images: yup.array().of(yup.string()).required("Images are required").min(1, "must be at least 1").max(5, "must be at most 5"),
    packageCost: yup.number().typeError("packageCost must be a number").required("packageCost is a required field").min(0, "package cost must be positive"),
    productComponents: yup.array().of(yup.string()).min(1, "Must select at least one component"),
    totalPrice: yup.number().typeError("totalPrice must be a number").required("totalPrice is a required field").min(1, "price must be positive"),
    isActive: yup.boolean().required("isActive is a required field"),
    isOnSale: yup.boolean().required("isOnSale is a required field"),
    salePercentage: yup.number()
        .when('isOnSale', {
            is: true,
            then: (schema) => schema
                .typeError("Sale percentage must be a number").min(0, "Sale percentage must be at least 0").max(100, "Sale percentage must be at most 100")
                .required("Sale percentage is a required field"), otherwise: (schema) => schema
                    .notRequired()
        }),
    stockQuantity: yup.number().typeError("stockQuantity must be a number").required("stockQuantity is a required field").min(0, "stock cannot be negative"),
    componentStatus: yup.string().required("componentStatus is a required field").min(3, "componentStatus must be at least 3 characters").max(15, "componentStatus must be at most 15 characters"),

});

interface CustomField {
    fieldName: string;
    fieldType: string;
    options: { value: string; label: string }[];
    isRequired: boolean;
}



const AddProductForm = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<IProduct | any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [components, setComponents] = useState<IComponent[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [customFields, setCustomFields] = useState<CustomField[]>([]);
    const [currentFieldName, setCurrentFieldName] = useState("");
    const [currentFieldType, setCurrentFieldType] = useState("");
    const [currentOptions, setCurrentOptions] = useState<{ value: string; label: string }[]>([]);
    const [currentOption, setCurrentOption] = useState({ value: '', label: '' });
    const [isRequired, setIsRequired] = useState(false);

    const dispatch = useDispatch();
    const componentState = useSelector((state: RootState) => state.component);

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<IProduct>({
        resolver: yupResolver(productSchema as any),
        defaultValues: product || {}
    });


  useEffect(() => {
    const fetchProduct = async () => {
      if (productId) {
        try {
          const fetchedProduct = await getItemById<any>(
            `api/inventory/product`,
            productId,
          );
          const { _id, __v, ...dataToUpdate } = fetchedProduct.data;
          setProduct(dataToUpdate);
          reset(dataToUpdate);
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




    //שש
    const handleAddCustomField = () => {
        setCustomFields([...customFields, {
            fieldName: currentFieldName,
            fieldType: currentFieldType,
            options: currentOptions,
            isRequired
        }]);
        setCurrentFieldName("");
        setCurrentFieldType("");
        setCurrentOptions([]);
        setCurrentOption({ value: '', label: '' });
        setIsRequired(false);
    };

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentOption(prev => ({ ...prev, [name]: value }));
    };

    const addOption = () => {
        if (currentOption.value && currentOption.label) {
            setCurrentOptions([...currentOptions, currentOption]);
            setCurrentOption({ value: '', label: '' });
        }
    };




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
  };

  const onSubmit: SubmitHandler<IProduct> = async (data) => {
    const componentIds = data.productComponents
      .map((name) => {
        const component = components.find((c) => c.name === name);
        return component ? component.id : null;
      })
      .filter((id): id is string => id !== null); // Filter out null values

        const newData = {
            ...data,
            customFields: customFields,

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
        const response = await updateItem<IProduct>(
          `api/inventory/product`,
          productId,
          newData,
        );
        console.log(
          t('inventory.Product updated successfully:'),
          response.data,
        );
      } catch (error) {
        console.error(t('inventory.Error updating product:'), error);
      }
    } else {
      try {
        const response = await addItem<IProduct>(
          'api/inventory/product',
          newData,
        );
        console.log(t('inventory.Product added successfully:'), response.data);
      } catch (error) {
        console.error(t('inventory.Error adding product:'), error);
      }
    }
  };

  if (loading) {
    return <div>{t('inventory.Loading...')}</div>;
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const images = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreviews(images);
      setValue('images', images);
    }
  };

  const handleComponentChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValue = event.target.value;
    const updatedValue = Array.isArray(selectedValue)
      ? selectedValue
      : [selectedValue];
    setValue('productComponents', updatedValue);
  };

  const handleIsOnSaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue('isOnSale', event.target.checked);
  };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="on">
//             <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         id="name-input"
//                         label="Name"
//                         variant="outlined"
//                         error={!!errors.name}
//                         helperText={errors.name?.message}
//                         {...register("name")}
//                         value={watch("name") || ""}
//                         fullWidth
//                     />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         id="description-input"
//                         label="Description"
//                         variant="outlined"
//                         error={!!errors.description}
//                         helperText={errors.description?.message}
//                         {...register("description")}
//                         value={watch("description") || ""}
//                         fullWidth
//                     />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         id="packageCost-input"
//                         label="Package Cost"
//                         variant="outlined"
//                         type="number"
//                         error={!!errors.packageCost}
//                         helperText={errors.packageCost?.message}
//                         {...register("packageCost")}
//                         value={watch("packageCost") || ""}
//                         fullWidth
//                     />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         id="totalPrice-input"
//                         label="Total Price"
//                         variant="outlined"
//                         type="number"
//                         error={!!errors.totalPrice}
//                         helperText={errors.totalPrice?.message}
//                         {...register("totalPrice")}
//                         value={watch("totalPrice") || ""}
//                         fullWidth
//                     />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         id="stockQuantity-input"
//                         label="Stock Quantity"
//                         variant="outlined"
//                         type="number"
//                         error={!!errors.stockQuantity}
//                         helperText={errors.stockQuantity?.message}
//                         {...register("stockQuantity")}
//                         value={watch("stockQuantity") || ""}
//                         fullWidth
//                     />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                     <TextField
//                         id="componentStatus-input"
//                         label="Component Status"
//                         variant="outlined"
//                         error={!!errors.componentStatus}
//                         helperText={errors.componentStatus?.message}
//                         {...register("componentStatus")}
//                         value={watch("componentStatus") || ""}
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
//                             error={!!errors.salePercentage}
//                             helperText={errors.salePercentage?.message}
//                             {...register("salePercentage")}
//                             defaultValue={product?.salePercentage || ''}
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
//                         {errors.productComponents && <p style={{ color: 'red' }}>{errors.productComponents.message}</p>}
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
//                     {errors.images && <p style={{ color: 'red' }}>{errors.images.message}</p>}
//                 </Grid>

//                 <Grid item xs={12} sm={12}>
//                     <Button type="submit" variant="contained" color="primary" fullWidth>
//                         {product ? "Update Product" : "Add Product"}
//                     </Button>
//                 </Grid>




//                 <Box>
//                     <TextField
//                         label="Field Name"
//                         variant="outlined"
//                         value={currentFieldName}
//                         onChange={(e) => setCurrentFieldName(e.target.value)}
//                         fullWidth
//                     />
//                 </Box>
//                 <Box>
//                     <FormControl fullWidth>
//                         <InputLabel>Field Type</InputLabel>
//                         <Select
//                             value={currentFieldType}
//                             onChange={(e) => setCurrentFieldType(e.target.value as string)}
//                         >
//                             <MenuItem value="TextField">TextField</MenuItem>
//                             <MenuItem value="Select">Select</MenuItem>
//                             <MenuItem value="Radio">Radio</MenuItem>
//                             <MenuItem value="Color">Color</MenuItem>
//                             {/* הוסף אפשרויות נוספות לפי הצורך */}
//                         </Select>
//                     </FormControl>
//                 </Box>
//                 {currentFieldType === 'Select' && (
//                     <Box>
//                         <TextField
//                             label="Option Value"
//                             name="value"
//                             variant="outlined"
//                             value={currentOption.value}
//                             onChange={handleOptionChange}
//                             fullWidth
//                         />
//                         <TextField
//                             label="Option Label"
//                             name="label"
//                             variant="outlined"
//                             value={currentOption.label}
//                             onChange={handleOptionChange}
//                             fullWidth
//                         />
//                         <Button onClick={addOption}>Add Option</Button>
//                         {currentOptions.map((option, index) => (
//                             <Box key={index}>{option.label}</Box>
//                         ))}
//                     </Box>
//                 )}
//                 <FormControlLabel
//                     control={<Checkbox checked={isRequired} onChange={(e) => setIsRequired(e.target.checked)} />}
//                     label="Required"
//                 />
//                 <Button onClick={handleAddCustomField}>Add Custom Field</Button>
//                 <Box>
//                     {customFields.map((field, index) => (
//                         <Box key={index}>
//                             <h3>{field.fieldName} ({field.fieldType})</h3>
//                             {field.fieldType === 'Select' && (
//                                 <ul>
//                                     {field.options.map((option, idx) => (
//                                         <li key={idx}>{option.label}</li>
//                                     ))}
//                                 </ul>
//                             )}
//                             {/* ניתן להוסיף תצוגה נוספת לפי סוג השדה */}
//                         </Box>
//                     ))}



//                     {/* <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
//                     <Checkbox  onClick={()=>{setIsCustomFileds(!isCustomFileds)}} />
//              do you want to add custom fields?
//                 </Box>
//                 {isCustomFileds && (
//                     <>
                        

//                         <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
//                             <TextField
//                                 type="text"
//                                 id="outlined-basic"
//                                 variant="outlined"
//                                 {...register("salePercentage")}
//                                 placeholder="fieldName"
//                             />
//                         </Box>
                        
//                         <Box className='itemInput' sx={{ '& > :not(style)': { m: 1, width: '18ch' } }}>
//                             <select onSelect={(event)=>{
//                                 event.target.value
//                             }}>
//                                 <option>button</option>
//                                 <option>Checkbox</option>
//                                 <option>CheckboxGroup</option>
//                                 <option>ButtonGroup</option>
//                                 <option>RadioGroup</option>
//                                 <option>Rating</option>
//                                 <option>Select</option>
//                                 <option>Slider</option>
//                                 <option>Switch</option>
//                                 <option>TextField</option>
//                                 <option>MenuItem</option>
//                                 <option>Input</option>
//                                 <option>colorPicker</option>
//                             </select>
//                         </Box>
//                     </>
//                 )} */}


//             </Grid>
//         </form>
//     );
// }

// export default AddProductForm;
return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="on">
        <Grid container spacing={2}>
            {/* שדות המוצר */}
            <Grid item xs={12} sm={6}>
                <TextField
                    id="name-input"
                    label="Name"
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...register("name")}
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
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    id="images-input"
                    type="file"
                    // inputProps={{ multiple: true }}
                    onChange={handleImageChange}
                    fullWidth
                />
                {imagePreviews.map((image, index) => (
                    <img key={index} src={image} alt={`Preview ${index}`} style={{ width: '100px', height: '100px' }} />
                ))}
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    id="packageCost-input"
                    label="Package Cost"
                    type="number"
                    variant="outlined"
                    error={!!errors.packageCost}
                    helperText={errors.packageCost?.message}
                    {...register("packageCost")}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id="components-select-label">Components</InputLabel>
                    <Select
                        labelId="components-select-label"
                        // multiple
                        value={watch("productComponents")}
                        onChange={handleComponentChange}
                        input={<OutlinedInput label="Components" />}
                        renderValue={(selected) => (
                            <div>
                                {selected.map((value) => (
                                    <Chip key={value} label={components.find(c => c.id === value)?.name} />
                                ))}
                            </div>
                        )}
                    >
                        {components.map((component) => (
                            <MenuItem key={component.id} value={component.id}>
                                {component.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    id="totalPrice-input"
                    label="Total Price"
                    type="number"
                    variant="outlined"
                    error={!!errors.totalPrice}
                    helperText={errors.totalPrice?.message}
                    {...register("totalPrice")}
                    fullWidth
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControlLabel
                    control={<Checkbox {...register("isActive")} />}
                    label="Active"
                />
                <FormControlLabel
                    control={<Checkbox {...register("isOnSale")} onChange={handleIsOnSaleChange} />}
                    label="On Sale"
                />
                {watch("isOnSale") && (
                    <TextField
                        id="salePercentage-input"
                        label="Sale Percentage"
                        type="number"
                        variant="outlined"
                        error={!!errors.salePercentage}
                        helperText={errors.salePercentage?.message}
                        {...register("salePercentage")}
                        fullWidth
                    />
                )}
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    id="stockQuantity-input"
                    label="Stock Quantity"
                    type="number"
                    variant="outlined"
                    error={!!errors.stockQuantity}
                    helperText={errors.stockQuantity?.message}
                    {...register("stockQuantity")}
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
                    fullWidth
                />
            </Grid>

            {/* הוספת שדות מותאמים אישית */}
            <Grid item xs={12}>
                <Box>
                    <TextField
                        id="fieldName-input"
                        label="Field Name"
                        value={currentFieldName}
                        onChange={(e) => setCurrentFieldName(e.target.value)}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel id="fieldType-select-label">Field Type</InputLabel>
                        <Select
                            labelId="fieldType-select-label"
                            value={currentFieldType}
                            onChange={(e) => setCurrentFieldType(e.target.value)}
                        >
                            <MenuItem value="text">Text</MenuItem>
                            <MenuItem value="number">Number</MenuItem>
                            <MenuItem value="color">Color</MenuItem>
                            <MenuItem value="select">Select</MenuItem>
                            <MenuItem value="radio">Radio</MenuItem>
                        </Select>
                    </FormControl>

                    {currentFieldType === "select" && (
                        <Box>
                            <TextField
                                id="option-value-input"
                                label="Option Value"
                                name="value"
                                value={currentOption.value}
                                onChange={handleOptionChange}
                                fullWidth
                            />
                            <TextField
                                id="option-label-input"
                                label="Option Label"
                                name="label"
                                value={currentOption.label}
                                onChange={handleOptionChange}
                                fullWidth
                            />
                            <Button onClick={addOption}>Add Option</Button>
                            <Box>
                                {currentOptions.map((option, index) => (
                                    <Chip key={index} label={option.label} />
                                ))}
                            </Box>
                        </Box>
                    )}

                    <FormControlLabel
                        control={<Checkbox checked={isRequired} onChange={(e) => setIsRequired(e.target.checked)} />}
                        label="Required"
                    />

                    <Button onClick={handleAddCustomField}>Add Custom Field</Button>
                </Box>

                <Box>
                    {customFields.map((field, index) => (
                        <Box key={index} marginY={2}>
                            <strong>{field.fieldName}</strong>
                            <div>Type: {field.fieldType}</div>
                            {field.fieldType === "select" && (
                                <div>Options: {field.options.map((opt, idx) => <Chip key={idx} label={opt.label} />)}</div>
                            )}
                            <div>Required: {field.isRequired ? "Yes" : "No"}</div>
                        </Box>
                    ))}
                </Box>
            </Grid>

            <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Grid>
        </Grid>
    </form>
);
};

export default AddProductForm;