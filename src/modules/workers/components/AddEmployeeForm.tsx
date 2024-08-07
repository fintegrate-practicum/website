import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Box, Alert, AlertTitle } from '@mui/material';
import { addEmployee, getUserByEmail, getUserByJwt } from '../features/employeeSlice';
import { useAppDispatch } from '../../../Redux/hooks';
import Employee from '../classes/employee';
import { Types } from 'mongoose';
import { Controller, useForm } from 'react-hook-form';

const AddEmployeeForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [emailError, setEmailError] = useState(false);
    const [existingBusiness, setExistingBusiness] = useState(false);
    const [employeeAdded, setEmployeeAdded] = useState(false);
    const [userInfo, setUserInfo] = useState<any>();

    const { control, handleSubmit, watch } = useForm();
    const type = watch('role.type');
    const description = watch('role.description');
    const nameEmployee = watch('nameEmployee');
    const email = watch('email');

    const fetchUserInfo = async () => {
        setUserInfo(await getUserByJwt());
    }

    const onSubmit = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|COM|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        }
        await fetchUserInfo();

        const newEmployee: Employee = {
            userId: '-1',
            businessId: new Types.ObjectId(/*שליפה של המזהה עסק מתוך ה URL*/'668ff1e5041b3614da40f0d5') || new Types.ObjectId('668ff1e5041b3614da40f0d5'),
            code: '',
            createdBy: userInfo?.auth0_user_id || 'a',
            updatedBy: userInfo?.auth0_user_id || 'a',
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
                    if (auth0Employee.businessRoles[index].role == 'employee') {
                        setExistingBusiness(true);
                        console.log('עובד כבר קיים במערכת')
                        return;
                    }
                    if (auth0Employee.businessRoles[index].role == 'admin') {
                        setExistingBusiness(true);
                        console.log('מנהל כבר קיים במערכת')
                        return;
                    }
                }
            }
            if (!existingBusiness) {
                console.log('שליחה ל auth  להוספת עסק ועידכון הסטטוס')
                await dispatch(addEmployee(newEmployee));
                setEmployeeAdded(true);
            }
            setEmailError(false);
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
                                required
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
                                required
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
                                required
                                {...field}
                            />
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                sx={{ marginBottom: '1rem' }}
                                fullWidth
                                label="אימייל"
                                variant="outlined"
                                required
                                error={emailError}
                                helperText={emailError ? 'כתובת אימייל לא תקינה' : ''}
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