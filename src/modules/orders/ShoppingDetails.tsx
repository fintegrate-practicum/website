import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Card, Grid, Typography } from '@mui/material';
import "./ShoppingDetails.css";
import { addItem, getAllItems } from './Api-Requests/genericRequests';
import { useAppSelector, useJwtFromCookie } from '../../Redux/hooks';
import { ICart } from './interfaces/ICart';
import { useDispatch } from 'react-redux';
import { getBasket } from './features/basket/basketSlice';
import { showErrorToast } from "../../components/generic/errorMassage";

interface Props {
    amount: number;
}

const ShoppingDetails: React.FC<Props> = ({ amount }) => {

    const userId = useJwtFromCookie('user_id')?.split('|')[1];
    const token = useJwtFromCookie('accessToken') || undefined;
    const Carts = useAppSelector((state) => state.cart?.data || []);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const dispatch = useDispatch();

    const currentEmployee = useAppSelector(
        (state) => state.currentUserSlice.CurrentUser.employeeDetails,
    );

    const productsCart = Carts.map(c => ({
        id: c.product.id,
        qty: c.Quantity,
    }));

    const getAllCart = async () => {
        try {
            const res = await getAllItems<ICart[]>(`cart/${currentEmployee.businessId}/${userId}`, token);
            dispatch(getBasket(res.data));
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedOption(e.target.value);
    };

    useEffect(() => {
        getAllCart();
    }, []);

    const saveDetails = async (data: Record<string, any>) => {
        try {
            const newData = {
                destinationAddress: {
                    ...data
                },
                user: userId,
                products: productsCart,
                businessCode: 'business123',
                settingManeger: 1,
                deliveryMethod: selectedOption,
            }
            await addItem("orders", newData);
            reset()
            alert("ההזמנה נשמרה בהצלחה");
        } catch (err) {
            console.log(err);
            showErrorToast("הייתה שגיאה בשמירת ההזמנה");
        }
    };


    const backForm = yup.object().shape({
        city: yup.string().when((selectedOption) => {
            return selectedOption.toString() === 'delivery' ? yup.string().required('city is a required field') : yup.string();
        }),
        street: yup.string().when((selectedOption) => {
            return selectedOption.toString() === 'delivery' ? yup.string().required('street is a required field') : yup.string()
        }),
        numBuild: yup.number().when((selectedOption) => {
            return selectedOption.toString() === 'delivery' ? yup.number().required('numBuild is a required field') : yup.number()
        }),
        floor: yup.number().when((selectedOption) => {
            return selectedOption.toString() === 'delivery' ? yup.number().required('floor is a required field') : yup.number()
        }),
        apartmentNumber: yup.number().when((selectedOption) => {
            return selectedOption.toString() === 'delivery' ? yup.number().required('apartmentNumber is a required field') : yup.number()
        }),
        lastName: yup.string().when((selectedOption) => {
            return selectedOption.toString() === 'delivery' ? yup.string().required('lastName is a required field') : yup.string()
        }),
    });



    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(backForm)
    });

    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2} direction="column" alignItems="center">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {productsCart.length > 0 && Carts.map((cart) => (
                    <Card sx={{ width: 200, maxWidth: '100%', boxShadow: 'lg', margin: 2 }}>
                        <Typography>
                            name: {cart.product.name}
                        </Typography>
                        <Typography>
                            Quantity: {cart.Quantity}
                        </Typography>
                        <Typography>
                            Price: {cart.product.packageCost}
                        </Typography>
                    </Card>
                ))}
            </Box>

            <Typography variant="h5">
                הסכום לתשלום: {amount}
            </Typography>

            <form onSubmit={handleSubmit(saveDetails)}>
                <FormControl >
                    <Typography >איך תרצה לאסוף את המשלוח</Typography>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={handleChange}
                        sx={{ justifyContent: 'center' }}
                    >
                        <FormControlLabel value="delivery" control={<Radio />} label="משלוח" />
                        <FormControlLabel value="selfCollection" control={<Radio />} label="איסוף עצמי" />
                    </RadioGroup>
                    {selectedOption === "delivery" &&
                        (<Box sx={{ '& > :not(style)': { m: 1, width: '25ch', display: 'block' }, }}>
                            <TextField id="filled-basic" fullWidth label="עיר" variant="filled" {...register("city")} />
                            {errors.city && <p>{errors.city.message}</p>}

                            <TextField id="filled-basic" fullWidth label="רחוב" variant="filled" {...register("street")} />
                            {errors.street && <p>{errors.street.message}</p>}
                            <TextField id="filled-basic" fullWidth label="מספר בנין" variant="filled" type='number' {...register("numBuild")} />
                            {errors.numBuild && <p>{errors.numBuild.message}</p>}

                            <TextField id="filled-basic" fullWidth label="קומה" variant="filled" type='number' {...register("floor")} />
                            {errors.floor && <p>{errors.floor.message}</p>}

                            <TextField id="filled-basic" fullWidth label="מספר דירה" variant="filled" type='number' {...register("apartmentNumber")} />
                            {errors.apartmentNumber && <p>{errors.apartmentNumber.message}</p>}

                            <TextField id="filled-basic" fullWidth label="שם משפחה" variant="filled" {...register("lastName")} />
                            {errors.lastName && <p>{errors.lastName.message}</p>}

                        </Box>)
                    }
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        שמור פרטים
                    </Button>

                </FormControl>
            </form>
        </Grid >

    );
}


export default ShoppingDetails;