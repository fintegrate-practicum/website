import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Box, Alert, AlertTitle } from '@mui/material';
import { addEmployee, getUserByEmail } from '../features/employeeSlice';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import Employee from '../classes/employee';
import { Types } from 'mongoose';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

const AddEmployeeForm: React.FC = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const [existingBusiness, setExistingBusiness] = useState(false);
    const [employeeAdded, setEmployeeAdded] = useState(false);
    const currentEmployee = useAppSelector((state) => state.currentUserSlice.employeeDetails);
    const { control, handleSubmit, formState: { errors }, getValues } = useForm<FormValues>({ resolver: yupResolver(schema), });

    const schema = yup.object({
    nameEmployee: yup.string().required(t('worker.This field is required')),
    role: yup.object({
        type: yup.string().required(t('worker.This field is required')),
        description: yup.string().required(t('worker.This field is required')),
    }),
    email: yup.string()
        .required(t('worker.This field is required'))
        .email(t('worker.Email address is not valid')).matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/,
            t('worker.Email address is not valid')
        ),
}).required();

    type FormValues = yup.InferType<typeof schema>;

    const onSubmit: SubmitHandler<FormValues> = async () => {
        const { nameEmployee, role, email } = getValues();

        const newEmployee: Employee = {
            userId: '-1',
            businessId: new Types.ObjectId(currentEmployee.businessId),
            code: '',
            createdBy: currentEmployee.id_user,
            updatedBy: currentEmployee.id_user,
            nameEmployee: nameEmployee,
            role: { type: role.type, active: false, description: role.description },
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
                    <AlertTitle>{t('common.Error')}</AlertTitle>
                    {t('worker.Error Message')}
                </Alert>
            )}
            {employeeAdded && (
                <Alert severity="success">
                    <AlertTitle>{t('common.Success')}</AlertTitle>
                    {t('worker.Success Message')}
                </Alert>
            )}
            <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {t('worker.Add Employee')}
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
                                label={t('worker.name')}
                                variant="outlined"
                                error={!!errors.nameEmployee}
                                helperText={errors.nameEmployee?.message || ''}
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
                                label={t('worker.role')}
                                variant="outlined"
                                error={!!errors.role?.type}
                                helperText={errors.role?.message || ''}
                                {...field}
                            >
                                <MenuItem value="admin">{t('worker.team manager')}</MenuItem>
                                <MenuItem value="employee">{t('worker.worker')}</MenuItem>
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
                                label={t('worker.Role Description')}
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
                            required: t('worker.This field is required'),
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/,
                                message:  t('worker.Email address is not valid'),
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                sx={{ marginBottom: '1rem' }}
                                fullWidth
                                label={t('worker.email')}
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
                        {t('worker.Add Employee Button')}
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default AddEmployeeForm;
