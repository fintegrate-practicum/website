import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';


import { updateBusiness } from '../../Redux/businessSlice';
import { useAppDispatch } from '../../Redux/hooks';
import { BusinessSize } from '../../classes/business';



export default function MoreDetailsManager(props: any): JSX.Element {
    const dispatch = useAppDispatch()

    const [description, setDescription] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAdress] = useState<string>('');
    const companyNumber = props.companyNumber;

    const [logo, setLogo] = useState<string>();

    const [businessSize, setBusinessSize] = useState<BusinessSize| ''>(BusinessSize.Public);
    const [industryType, setIndustryType] = useState<string>('');    

    const handleBusinessDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDescription(event.target.value);
    };

    const handleBusinessPhoneChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPhone(event.target.value);
    };
    const handleBusinessAdressChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAdress(event.target.value);
    };
    const handleBusinessSizeChange = (event: SelectChangeEvent<string>): void => {
        setBusinessSize(event.target.value as BusinessSize);

    };
    const handleIndustryTypeChange = (event: SelectChangeEvent<string>): void => {
        setIndustryType(event.target.value);
    };

    const StyledInput = styled('input')({
        display: 'none',
    });

    const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();            
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setLogo(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    }; 
    
    const newData = { description, phone, address, businessSize ,industryType,logo: logo?.replace(/^data:image\/png;base64,/, '')};

    return (
        <Box
            component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, }}
            noValidate
            autoComplete="off"
        >
            <div><TextField id="outlined-basic" label="description" variant="outlined" value={description} onChange={handleBusinessDescriptionChange} /></div>
            <div><TextField id="outlined-basic" label="phone" variant="outlined" value={phone} onChange={handleBusinessPhoneChange} /></div>
            <div><TextField id="outlined-basic" label="adress" variant="outlined" value={address} onChange={handleBusinessAdressChange} /></div>

            <div><FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">business Size</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={businessSize}
                    label="business Size"
                    onChange={handleBusinessSizeChange}
                >
                    {Object.values(BusinessSize).map((size) => (
                        <MenuItem key={size} value={size}>
                            {size}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl></div>

           <div><FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">industry Type</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={industryType}
                    label="business Size"
                    onChange={handleIndustryTypeChange}
                >
                        <MenuItem value={'service provider'}>service provider</MenuItem>      
                        <MenuItem value={'gives a product'}>gives a product</MenuItem>                    
              
                </Select>
            </FormControl></div> 

            <Stack direction="row" spacing={2}>

            </Stack>
            {logo && (
                <Box mt={2}>
                    <img src={logo} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </Box>
            )}

            <div>
                <label htmlFor="image-input">
                    <Button component="span" variant="contained">
                        Upload Logo
                    </Button>
                </label>
                <StyledInput id="logo-input" type="file" accept="logo/*" onChange={handleLogoChange}/>              
            </div>

            <Button variant="contained" color="success" onClick={() => {
                dispatch(updateBusiness({ companyNumber, newData }));
            }}> Submit</Button>
        </Box>
    );
}






