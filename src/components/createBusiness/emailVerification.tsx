import { useState } from 'react';
import { TextField, Container,Stack } from '@mui/material';
import Typography from '../../common/components/Typography/Typography';
import Button from '../../common/components/Button/Button'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { checkEmailVerificationCode } from '../../Redux/businessSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const EmailVerification = () => {

    const {        
        handleSubmit,        
    } = useForm();

    const email = useAppSelector((state) => state.businessSlice.business.email)
    const dispatch = useAppDispatch()
    const [code, setCode] = useState<string>('');
    const navigate = useNavigate();

    const onSubmit = async () => {        
        const answer=await dispatch(checkEmailVerificationCode({ email, code }));
        if(answer.payload.status==200){
            navigate('/CreateBusiness/MoreDetailsManager');
        } 
        
    };

    return (
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Button  color="success"   type='submit'>submit</Button>
                </Stack>
            </form>
        </Container>
    );
}

export default EmailVerification;
