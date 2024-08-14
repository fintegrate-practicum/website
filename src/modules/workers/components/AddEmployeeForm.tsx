import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Box, Alert, AlertTitle } from '@mui/material';
import { addEmployee, getUserByEmail } from '../features/employeeSlice';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import Employee from '../classes/employee';
import { Types } from 'mongoose';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 

const schema = yup.object({
    nameEmployee: yup.string().required('שם העובד הוא שדה חובה'),
    role: yup.object({
        type: yup.string().required('תפקיד הוא שדה חובה'),
        description: yup.string().required('תיאור תפקיד הוא שדה חובה'),
    }),
    email: yup.string()
        .required('אימייל הוא שדה חובה')
        .email('כתובת אימייל לא תקינה').matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/,
            'כתובת אימייל לא תקינה'
        ),
}).required();

type FormValues = yup.InferType<typeof schema>;

const AddEmployeeForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [existingBusiness, setExistingBusiness] = useState(false);
    const [employeeAdded, setEmployeeAdded] = useState(false);
    const currentEmployee = useAppSelector((state) => state.currentUserSlice.CurrentUser.employeeDetails);
    const { control, handleSubmit, watch,formState: { errors } } = useForm<FormValues>({resolver: yupResolver(schema), });
    const type = watch('role.type');
    const description = watch('role.description');
    const nameEmployee = watch('nameEmployee');
    const email = watch('email');

    const onSubmit: SubmitHandler<FormValues> = async () => {
        const newEmployee: Employee = {
            userId: '-1',
            businessId: new Types.ObjectId(currentEmployee.businessId),
            code: '',
            createdBy: currentEmployee.id_user,
            updatedBy: currentEmployee.id_user,
            nameEmployee: nameEmployee,
            role: { type: type, active: false, description: description },
        };

        const employee = await dispatch(getUserByEmail(email));
        if (employee.payload == undefined) {
            console.log('משתמש לא קיים - לשלוח ל auth');
            await dispatch(addEmployee(newEmployee));
            setEmployeeAdded(true);
        }
        else {
            const auth0Employee = employee.payload.data;
            for (let index = 0; index < auth0Employee.businessRoles.length; index++) {
                if (auth0Employee.businessRoles[index].businessId === newEmployee.businessId.toString()) {
                    if (auth0Employee.businessRoles[index].role == 'client') {
                        console.log('לשלוח לauth כדי להגדיל את ההרשאות גישה')
                        await dispatch(addEmployee(newEmployee));
                        setEmployeeAdded(true);
                        return;
                    }
                    if (auth0Employee.businessRoles[index].role == 'employee' || auth0Employee.businessRoles[index].role == 'admin') {
                        setExistingBusiness(true);
                        console.log('עובד כבר קיים במערכת')
                        return;
                    }
                }
            }
            if (!existingBusiness) {
                console.log('שליחה ל auth  להוספת עסק ועידכון הסטטוס')
                await dispatch(addEmployee(newEmployee));
                setEmployeeAdded(true);
            }
        }
    };

    return (
        <>
            {existingBusiness && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    An existing employee systems
                </Alert>
            )}
            {employeeAdded && (
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    An employee is added to the system
                </Alert>
            )}
            <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    הוספת עובד חדש
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="nameEmployee"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                sx={{ marginBottom: '1rem' }}
                                fullWidth
                                label="שם העובד"
                                variant="outlined"
                                error={!!errors.nameEmployee}
                                helperText={errors.nameEmployee?.message||''}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="role.type"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                sx={{ marginBottom: '1rem' }}
                                fullWidth
                                select
                                label="תפקיד"
                                variant="outlined"
                                error={!!errors.role?.type}
                                helperText={errors.role?.message || ''}
                                {...field}
                            >
                                <MenuItem value="admin">מנהל צוות</MenuItem>
                                <MenuItem value="employee">עובד</MenuItem>
                            </TextField>
                        )}
                    />
                    <Controller
                        name="role.description"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                sx={{ marginBottom: '1rem' }}
                                fullWidth
                                label="תיאור תפקיד"
                                variant="outlined"
                                error={!!errors.role?.description}
                                helperText={errors.role?.description?.message || ''}
                                {...field}
                            />
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "אימייל הוא שדה חובה",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/,
                                message: "כתובת אימייל לא תקינה",
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                sx={{ marginBottom: '1rem' }}
                                fullWidth
                                label="אימייל"
                                variant="outlined"
                                error={!!errors.email}
                                helperText={errors.email?.message || ''}
                                {...field}
                            />
                        )}
                    />
                    <Button
                        sx={{ marginTop: '1rem' }}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        הוסף עובד
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default AddEmployeeForm;