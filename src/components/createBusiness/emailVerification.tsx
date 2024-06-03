import { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const EmailVerification = () => {
    const [code, setCode] = useState<string>('');

    const { companyNumber, email } = useParams();

    const handleSubmit = () => {
        alert(companyNumber + " " + email);
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
            <Button variant="contained" color="primary" type="submit">
                submit
            </Button>
            </form>
        </Container>
    );
}

export default EmailVerification;
