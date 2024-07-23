import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '../../common/components/Button/Button'
import { createBusiness, saveBusiness } from '../../Redux/businessSlice';
import { useAppDispatch } from "../../Redux/hooks";
import { useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { BusinessSize } from '../../classes/Business';
import { useNavigate } from 'react-router-dom';
export default function BaseDetailsManager(): JSX.Element {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (values: any) => {

        const answer = await dispatch(createBusiness({
            companyNumber: values.companyNumber, name: values.name, email: values.email,
            description: '',
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
        }));

        if (answer.payload.status == 201) {

            dispatch(saveBusiness({ companyNumber: values.companyNumber, email: values.email }))
            navigate('/CreateBusiness/EmailVerification');
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <TextField id="outlined-basic" label="company Number" variant="outlined"
                    {...register("companyNumber", { required: true, pattern: /^516[0-9]{6}$/i })} />
                <br />
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
                <br />
                {errors.name && <Typography
                    style={{
                        fontWeight: "bold",
                        fontSize: 10,
                        color: "red"
                    }}>שם החברה מכיל יותר מ-2 אותיות ופחות מ-30</Typography>}
            </div>
            <div>
                <TextField id="outlined-basic" label="business email" variant="outlined"
                    {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} />
                <br />
                {errors.email && <Typography
                    style={{
                        fontWeight: "bold",
                        fontSize: 10,
                        color: "red"
                    }}>מייל לא תקין</Typography>}
            </div>

            <Stack direction="row" spacing={2}>
                <Button
                    isLink={false}
                    value="שלח"
                    color="#6503A6"
                    type='submit'
                />
            </Stack>
        </form>
    )
}

