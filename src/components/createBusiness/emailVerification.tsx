import { useState } from 'react';
import { TextField, Typography, Container } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hooks';
import { checkEmailVerificationCode } from '../../Redux/businessSlice';

const EmailVerification = () => {
    const dispatch = useAppDispatch()
    const [code, setCode] = useState<string>('');

    const { companyNumber, email } = useParams();

    const handleSubmit = () => {
        dispatch(checkEmailVerificationCode({email, code}));
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
            <Link type="submit" to={`/CreateBusiness/MoreDetailsManager/${companyNumber}`}>
                submit
            </Link>
            </form>
        </Container>
    );
}

export default EmailVerification;
