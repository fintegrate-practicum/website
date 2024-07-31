import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Box, Alert, AlertTitle } from '@mui/material';
import { addEmployee, getUserByEmail, getUserByJwt } from '../features/employeeSlice';
import { useAppDispatch } from '../../../Redux/hooks';
import Employee from '../classes/employee';
import { Types } from 'mongoose';
// import workerInstance from '../../../auth0/WorkersInterceptors';
// import User from '../classes/user';

const AddEmployeeForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [nameEmployee, setNameEmployee] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [existingBusiness, setExistingBusiness] = useState(false);
    const [employeeAdded, setEmployeeAdded] = useState(false);

    const [userInfo, setUserInfo] = useState<any>();

    const fetchUserInfo = async () => {
        console.log('fetch user info')
        setUserInfo(getUserByJwt());
        console.log(userInfo)
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|COM|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        }
        fetchUserInfo();
        console.log('user info')
        console.log(userInfo);
        const newEmployee: Employee = {
            userId: '-1',
            businessId: new Types.ObjectId(/*שליפה של המזהה עסק מתוך ה URL*/'668ff1e5041b3614da40f0d5') || new Types.ObjectId('668ff1e5041b3614da40f0d5'),
            code: '',
            createdBy: userInfo?.auth0_user_id || 'a',
            updatedBy: userInfo?.auth0_user_id || 'a',
            nameEmployee: nameEmployee,
            role: { type: type, active: false, description: description },
        };
        console.log('new employee')
        console.log(newEmployee)
        const employee = await dispatch(getUserByEmail(email));
        console.log(employee)
        const auth0Employee = employee.payload.data;
        if (!auth0Employee) {
            console.log('משתמש לא קיים - לשלוח ל auth');
            await dispatch(addEmployee(newEmployee));
            setEmployeeAdded(true);
        }
        else
            for (let index = 0; index < auth0Employee.businessRoles.length; index++) {
                if (auth0Employee.businessRoles[index].businessId === newEmployee.businessId.toString()) {
                    if (auth0Employee.businessRoles[index].role == 'Client') {
                        console.log('לשלוח לauth כדי להגדיל את ההרשאות גישה')
                        await dispatch(addEmployee(newEmployee));
                        setEmployeeAdded(true);
                    }
                    if (auth0Employee.businessRoles[index].role == 'Employee') {
                        setExistingBusiness(true);
                        console.log('עובד כבר קיים במערכת')
                        return;
                    }
                    if (auth0Employee.businessRoles[index].role == 'Admin') {
                        setExistingBusiness(true);
                        console.log('מנהל כבר קיים במערכת')
                        console.log('exist')
                        console.log(existingBusiness)
                        return;
                    }
                }
            }
        if (!existingBusiness) {
            console.log('שליחה ל auth  להוספת עסק ועידכון הסטטוס')
            await dispatch(addEmployee(newEmployee));
            setEmployeeAdded(true);
        }
        console.log('exist')
        console.log(existingBusiness)
        setEmailError(false);
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
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        sx={{ marginBottom: '1rem' }}
                        fullWidth
                        label="שם העובד"
                        name="nameEmployee"
                        value={nameEmployee}
                        onChange={(e) => setNameEmployee(e.target.value)}
                        variant="outlined"
                        required
                    />

                    <TextField
                        sx={{ marginBottom: '1rem' }}
                        fullWidth
                        select
                        label="תפקיד"
                        name="role.type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        variant="outlined"
                        required
                    >
                        <MenuItem value="admin">מנהל צוות</MenuItem>
                        <MenuItem value="employee">עובד</MenuItem>
                    </TextField>

                    <TextField
                        sx={{ marginBottom: '1rem' }}
                        fullWidth
                        label="תיאור תפקיד"
                        name="role.description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        variant="outlined"
                        required
                    />

                    <TextField
                        sx={{ marginBottom: '1rem' }}
                        fullWidth
                        label="אימייל"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        required
                        error={emailError}
                        helperText={emailError ? 'כתובת אימייל לא תקינה' : ''}
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