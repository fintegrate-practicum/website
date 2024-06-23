import { useState } from 'react';
import { TextField, Typography, Container, Button, Stack } from '@mui/material';
import { useAppDispatch } from '../../Redux/hooks';
import { checkEmailVerificationCode } from '../../Redux/businessSlice';
import Business from '../../classes/business';

const EmailVerification = (props: {business : Business}) => {
    const dispatch = useAppDispatch()
    const [code, setCode] = useState<string>('');
    const {business} = props

    const handleSubmit = () => {
        dispatch(checkEmailVerificationCode({email: business.email, code}));
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
