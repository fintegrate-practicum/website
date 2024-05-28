import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createBusiness } from '../../Redux/businessSlice';
import { useAppDispatch } from "../../Redux/hooks";

export default function BaseDetailsManager(): JSX.Element {
    const dispatch = useAppDispatch()

    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [owner, setManagerName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleBusinessIdChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setId(event.target.value);
    };

    const handleBusinessNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    };

    const handleBusinessManagerNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setManagerName(event.target.value);
    };

    const handleBusinessEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
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
                <Button variant="contained" color="success" onClick={() => {
                    dispatch(createBusiness({ id, name, owner, email }));
                }}> Submit</Button>

            </Stack>
        </Box>
    )
}
