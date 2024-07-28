// import React, { useState } from 'react';
// import { Box, Button, Stack } from '@mui/material';
// import TextField from '@mui/material/TextField';
// import { styled } from '@mui/system';
// import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
// import { updateBusiness } from '../../Redux/businessSlice';
// import { useAppDispatch ,useAppSelector} from '../../Redux/hooks';
// import { BusinessSize } from '../../classes/Business';

// export default function MoreDetailsManager(): JSX.Element {
//     const companyNumber=useAppSelector((state)=>state.businessSlice.business.companyNumber)

//     const dispatch = useAppDispatch()

//     const [description, setDescription] = useState<string>('');
//     const [phone, setPhone] = useState<string>('');
//     const [address, setAdress] = useState<string>('');

//     const [logo, setLogo] = useState<string>();

//     const [businessSize, setBusinessSize] = useState<BusinessSize| ''>(BusinessSize.Public);
//     const [industryType, setIndustryType] = useState<string>('');    

//     const handleBusinessDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
//         setDescription(event.target.value);
//     };

//     const handleBusinessPhoneChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
//         setPhone(event.target.value);
//     };
//     const handleBusinessAdressChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
//         setAdress(event.target.value);
//     };
//     const handleBusinessSizeChange = (event: SelectChangeEvent<string>): void => {
//         setBusinessSize(event.target.value as BusinessSize);

//     };
//     const handleIndustryTypeChange = (event: SelectChangeEvent<string>): void => {
//         setIndustryType(event.target.value);
//     };

//     const StyledInput = styled('input')({
//         display: 'none',
//     });

//     const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];        

//         if (file) {
//             const reader = new FileReader();            
//             reader.onloadend = () => {                
//                 if (typeof reader.result === 'string') {
//                     setLogo(reader.result);
//                 }
//             };
//             reader.readAsDataURL(file);
//         }
//     }; 

//     const newData = { description, phone, address, businessSize ,industryType,logo: logo?.replace(/^data:image\/png;base64,/, '')};

//     return (
//         <Box
//             component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
//             noValidate
//             autoComplete="off"
//         >
//             <div><TextField id="outlined-basic" label="description" variant="outlined" value={description} onChange={handleBusinessDescriptionChange} /></div>
//             <div><TextField id="outlined-basic" label="phone" variant="outlined" value={phone} onChange={handleBusinessPhoneChange} /></div>
//             <div><TextField id="outlined-basic" label="adress" variant="outlined" value={address} onChange={handleBusinessAdressChange} /></div>

//             <div><FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">business Size</InputLabel>
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={businessSize}
//                     label="business Size"
//                     onChange={handleBusinessSizeChange}
//                 >
//                     {Object.values(BusinessSize).map((size) => (
//                         <MenuItem key={size} value={size}>
//                             {size}
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl></div>

//            <div><FormControl fullWidth>
//                 <InputLabel id="demo-simple-select-label">industry Type</InputLabel>
//                 <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     value={industryType}
//                     label="business Size"
//                     onChange={handleIndustryTypeChange}
//                 >
//                         <MenuItem value={'service provider'}>service provider</MenuItem>      
//                         <MenuItem value={'gives a product'}>gives a product</MenuItem>                    

//                 </Select>
//             </FormControl></div> 

//             <Stack direction="row" spacing={2}>

//             </Stack>
//             {logo && (
//                 <Box mt={2}>
//                     <img src={logo} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
//                 </Box>
//             )}

//             <div>
//                 <label htmlFor="logo-input">
//                     <Button component="span" variant="contained" >
//                         Upload Logo
//                     </Button>
//                 </label>
//                 <StyledInput id="logo-input" type="file" accept="logo/*" onChange={handleLogoChange}/>              
//             </div>

//             <Button variant="contained" color="success" onClick={() => {
//                 dispatch(updateBusiness({ companyNumber, newData }));
//             }}> Submit</Button>
//         </Box>
//     );
// }
import React from 'react';
import { updateBusiness } from '../../Redux/businessSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { BusinessSize } from '../../classes/Business';
import FormWrapper from '../../stories/FormWrapper';
import { FieldValues } from 'react-hook-form';

export default function MoreDetailsManager(): JSX.Element {
    const companyNumber = useAppSelector((state) => state.businessSlice.business.companyNumber);
    const dispatch = useAppDispatch();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setValue: any) => {
        const file = e.target.files?.[0];
        const maxSize = 5 * 1024 * 1024; // גודל מקסימלי 5MB

        if (file) {
            if (file.size > maxSize) {
                alert("הקובץ גדול מדי. יש להעלות קובץ קטן יותר מ-5MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // הגדרת מידות התמונה החדשה
                    const maxWidth = 800;
                    const maxHeight = 800;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height = Math.round((height * maxWidth) / width);
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = Math.round((width * maxHeight) / height);
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    ctx?.drawImage(img, 0, 0, width, height);
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // דחיסת התמונה לפורמט JPEG

                    setValue('logo', dataUrl, { shouldValidate: true });
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (values: FieldValues) => {
        const newData = {
            description: values.description,
            phone: values.phone,
            address: values.address,
            businessSize: values.businessSize,
            industryType: values.industryType,
            logo: typeof values.logo === 'string' ? values.logo.replace(/^data:image\/[a-z]+;base64,/, '') : undefined,
        };
        console.log(newData, "newData'");
        console.log(values, "values'");

        dispatch(updateBusiness({ companyNumber, newData }));
    };

    const fields = [
        { name: 'description', label: 'Description', type: 'text' },
        { name: 'phone', label: 'Phone', type: 'text' },
        { name: 'address', label: 'Address', type: 'text' },
        {
            name: 'businessSize',
            label: 'Business Size',
            type: 'select',
            options: Object.values(BusinessSize),
        },
        {
            name: 'industryType',
            label: 'Industry Type',
            type: 'select',
            options: ['service provider', 'gives a product'],
        },
        {
            name: 'logo',
            label: 'Logo',
            type: 'file',
            onChange: (e: React.ChangeEvent<HTMLInputElement>, setValue: any) => handleFileChange(e, setValue),
        },
    ];

    return (
        <FormWrapper onSubmit={onSubmit} fields={fields} />
    );
}


