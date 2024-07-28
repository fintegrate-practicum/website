import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem, Box } from '@mui/material';
// import { Types } from 'mongoose';
import { addEmployee, getUserByEmail } from '../features/employeeSlice';
import { useAppDispatch } from '../../../Redux/hooks';
import Employee from '../classes/employee';
import { Types } from 'mongoose';
import workerInstance from '../../../auth0/WorkersInterceptors';
import User from '../classes/user';
// import { useAuth0 } from '@auth0/auth0-react';
// import workerInstance from '../../../auth0/WorkersInterceptors';
// import User from '../classes/user';
// import { log } from 'console';

const AddEmployeeForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const [nameEmployee, setNameEmployee] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    // const [userExist, setUserExist] = useState('');

    const [userInfo, setUserInfo] = useState<User>();

    //זה עדיין לא עובד וזה יוכל לעבוד רק אחרי שיגמרו לסדר את כל הענין של ה USER
    const fetchUserInfo = async () => {
        try {
            const response = await workerInstance.get('/user/jwt');
            setUserInfo(response.data);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    }



    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|COM|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/;
        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        }
        fetchUserInfo();
        const newEmployee: Employee = {
            userId: '-1',
            businessId: new Types.ObjectId(/*שליפה של המזהה עסק מתוך ה URL*/'668ff1e5041b3614da40f0d5') || new Types.ObjectId('668ff1e5041b3614da40f0d5'),
            code: '',
            createdBy: userInfo?.auth0_user_id || 'a',
            updatedBy: userInfo?.auth0_user_id || 'a',
            nameEmployee: nameEmployee,
            role: { type: type, active: false, description: description },
        };
        //אני צריכה לבדוק את זה זה לא עובד!!!
        const employee = await dispatch(getUserByEmail(email));
        const auth0Employee = employee.payload.data;
        console.log(auth0Employee)
        if (!auth0Employee)
            console.log('משתמש לא קיים - לשלוח ל auth')
        else
            for (let index = 0; index < auth0Employee.businessRoles.length; index++) {
                if (auth0Employee.businessRoles[index].businessId === newEmployee.businessId.toString()) {
                    //בדיקה על התפקיד שלו
                    if (auth0Employee.businessRoles[index].role == 'User')
                        console.log('לשלוח לauth כדי להגדיל את ההרשאות גישה')
                    if (auth0Employee.businessRoles[index].role == 'Employee')
                        console.log('עובד כבר קיים במערכת')
                    if (auth0Employee.businessRoles[index].role == 'Manager')
                        console.log('מנהל כבר קיים במערכת')
                }
                else
                console.log('שליחה ל auth  להוספת עסק ועידכון הסטטוס')
                //משתמש קיים בעסק אחר ,צריך להוסיף לו עסק נוסף auth0 שליחה ל 
            }
        setEmailError(false);
        await dispatch(addEmployee(newEmployee));
    };

    return (
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
    );
};

export default AddEmployeeForm;