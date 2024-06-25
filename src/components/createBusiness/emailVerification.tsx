import { useState } from 'react';
import { TextField, Typography, Container, Button, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { checkEmailVerificationCode } from '../../Redux/businessSlice';

const EmailVerification = () => {

    const email=useAppSelector((state)=>state.businessSlice)
    const dispatch = useAppDispatch()
    const [code, setCode] = useState<string>('');


    const handleSubmit = async () => {
       await dispatch(checkEmailVerificationCode({email, code}));
       console.log('your email is correct');       
        window.location.href ='/CreateBusiness/MoreDetailsManager';
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom>
            sent you a code by email.
            </Typography>
            <TextField
                label="code"
                variant="outlined"
                fullWidth
                value={code}
                onChange={(event) => setCode(event.target.value)}
                style={{ marginBottom: '1rem' }}
            />
            <Stack direction="row" spacing={2}>
                <Button variant="contained" color="success" type='submit'>submit</Button>
            </Stack>
            </form>
        </Container>
    );
}

export default EmailVerification;
