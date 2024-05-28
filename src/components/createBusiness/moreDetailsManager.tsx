import React, { useState } from 'react';
import { Box, Typography, Button ,Stack} from '@mui/material';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';


// import { createBusiness } from '../../Redux/businessSlice';
// import { useAppDispatch } from "../../Redux/hooks";

export default function MoreDetailsManager(): JSX.Element {
    // const dispatch = useAppDispatch()

    const [describe, setDescribe] = useState<string>('');
    const [phone, setPhone] = useState<number>(0);
    const [adress, setAdress] = useState<string>('');

    const [image, setImage] = useState<string>();

    const [businessSize, setBusinessSize] = useState<string>('');

    const handleBusinessDescribeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setDescribe(event.target.value);
    };

    const handleBusinessPhoneChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPhone(parseInt(event.target.value));
    };
    const handleBusinessAdressChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAdress(event.target.value);
    };
    const handleBusinessBusinessSizeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setBusinessSize(event.target.value);
    };
    
    const StyledInput = styled('input')({
        display: 'none',
    });

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();            
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };
   
    
    

    return (        
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div><TextField id="outlined-basic" label="business Id" variant="outlined" value={id} onChange={handleBusinessIdChange} /></div>
            <div><TextField id="outlined-basic" label="business name" variant="outlined" value={name} onChange={handleBusinessNameChange} /></div>
            <div><TextField id="outlined-basic" label="business manager name" variant="outlined" value={owner} onChange={handleBusinessManagerNameChange} /></div>
            <div> <TextField id="outlined-basic" label="business email" variant="outlined" value={email} onChange={handleBusinessEmailChange} /></div>

            <Stack direction="row" spacing={2}>            

            </Stack>
            {/* {image && (
                <Box mt={2}>
                    <img src={image} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                </Box>
            )} */}
           
            <div>
                <label htmlFor="image-input">
                    <Button component="span" variant="contained">
                        Upload Image
                    </Button>
                </label>
                <StyledInput id="image-input" type="file" accept="image/*" onChange={handleImageChange}/>              
            </div>
            <Button variant="contained" color="success" onClick={() => {
                    // dispatch(createBusiness({ id, name, owner, email }));
                }}> Submit</Button>
        </Box>        
    );
}






