import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createBusiness } from '../../Redux/businessSlice';
import { useAppDispatch } from "../../Redux/hooks";
import { useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import Business, { BusinessSize } from '../../classes/business';

export default function BaseDetailsManager(): JSX.Element {
    const dispatch = useAppDispatch()

    const business: Business = {
        companyNumber: '',
        description: '',
        name: '',
        email: '',
        logo: '',
        phone: '',
        address: {
            city: '',
            street: '',
            num: 0
        },
        businessSize: BusinessSize.Private,
        industryType: '',
        establishmentDate: '',
        code: ''
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();

    const onSubmit = (values: any) => {
        business.companyNumber = values.companyNumber
        business.name = values.name
        business.email = values.email;
        dispatch(createBusiness(values.email));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <TextField id="outlined-basic" label="company Number" variant="outlined"
                {...register("companyNumber", { required: true, pattern: /^516[0-9]{6}$/i })} />
                <br/>
                {errors.companyNumber && <Typography
                    style={{
                        fontWeight: "bold",
                        fontSize: 10,
                        color: "red"
                }}>מספר חברה מתחיל ב-516 ומכיל 9 ספרות</Typography>}
            </div>
            <div>
                <TextField id="outlined-basic" label="business name" variant="outlined"
                {...register("name", { required: true, pattern: /^[A-Z]{2,30}$/i })} />
                <br/>
                {errors.name && <Typography
                    style={{
                        fontWeight: "bold",
                        fontSize: 10,
                        color: "red"
                }}>שם החברה מכיל יותר מ-2 אותיות ופחות מ-30</Typography>}
            </div>
            <div> 
                <TextField id="outlined-basic" label="business email" variant="outlined"
                {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}/>
                <br/>
                {errors.email && <Typography
                    style={{
                        fontWeight: "bold",
                        fontSize: 10,
                        color: "red"
                }}>מייל לא תקין</Typography>}
            </div>

            <Stack direction="row" spacing={2}>
                <Button variant="contained" color="success" type='submit'> Submit</Button>
            </Stack>
        </form>
    )
}

