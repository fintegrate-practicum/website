import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useAppDispatch } from '../../Redux/hooks';
import { changeSettingEmail } from '../../Redux/emailSlice';



export default function ChooseEmail() {
    const dispatch = useAppDispatch()

    const [checkBoxValues, setCheckBoxValues] = useState({

        sendRecruitmentNotification: true,
        sendCVReceiptNotification: true,
        sendInterviewConfirmation: true,
        sendRecruitmentStatusUpdate: true,
        sendTaskAssignment: true,
        sendTaskStatusUpdate: true,
        sendApprovalRequest: true,
        sendFeedbackToEmployee: true,
        sendNewCourseNotification: true,
        sendTrainingInvitation: true,
        sendTrainingStatusUpdate: true,
        sendAttendanceReportUpdate: true,
        sendSalaryCalculationUpdate: true,
        sendPaymentTransferConfirmation: true,
    });

    const handleCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        setCheckBoxValues({ ...checkBoxValues, [name]: checked });
    };
    const onsubmit = () => {
        dispatch(changeSettingEmail(
            checkBoxValues
        ));
    }
    return (
        <>
            <Box>Select preferred email types</Box>
            <FormGroup sx={{ display: 'flex', flexWrap: 'nowrap', flexDirection: 'row' }} >

                <Box sx={{ display: 'flex', flexWrap: 'wrap' }} >
                    <FormControlLabel
                        control={<Checkbox checked={checkBoxValues.sendRecruitmentNotification} onChange={handleCheckboxChange} name="sendRecruitmentNotification" />}
                        label="send Recruitment Notification"
                    />
                    <FormControlLabel control={<Checkbox checked={checkBoxValues.sendCVReceiptNotification} onChange={handleCheckboxChange} name="sendCVReceiptNotification" />} label="send CV Receipt Notification" />
                    <FormControlLabel control={<Checkbox checked={checkBoxValues.sendInterviewConfirmation} onChange={handleCheckboxChange} name="sendInterviewConfirmation" />} label="send Interview Confirmation" />
                    <FormControlLabel control={<Checkbox checked={checkBoxValues.sendRecruitmentStatusUpdate} onChange={handleCheckboxChange} name="sendRecruitmentStatusUpdate" />} label="send Recruitment Status Update" />
                    <FormControlLabel control={<Checkbox checked={checkBoxValues.sendTaskAssignment} onChange={handleCheckboxChange} name="sendTaskAssignment" />} label="send Task Assignment" />
                    <FormControlLabel control={<Checkbox checked={checkBoxValues.sendTaskStatusUpdate} onChange={handleCheckboxChange} name="sendTaskStatusUpdate" />} label="send Task Status Update" />
                    <FormControlLabel control={<Checkbox checked={checkBoxValues.sendApprovalRequest} onChange={handleCheckboxChange} name="sendApprovalRequest" />} label="send Approval Request" />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormControlLabel control={<Checkbox checked={checkBoxValues.sendFeedbackToEmployee} onChange={handleCheckboxChange} name="sendFeedbackToEmployee" />} label="send Feedback To Employee" />
                    <FormControlLabel control={<Checkbox checked={checkBoxValues.sendNewCourseNotification} onChange={handleCheckboxChange} name="sendNewCourseNotification" />} label="send New Course Notification" />
                    <FormControlLabel control={<Checkbox checked={checkBoxValues.sendTrainingInvitation} onChange={handleCheckboxChange} name="sendTrainingInvitation" />} label="send Training Invitation" />
                    <FormControlLabel control={<Checkbox checked={checkBoxValues.sendTrainingStatusUpdate} onChange={handleCheckboxChange} name="sendTrainingStatusUpdate" />} label="send Training Status Update" />
                    <FormControlLabel control={<Checkbox checked={checkBoxValues.sendAttendanceReportUpdate} onChange={handleCheckboxChange} name="sendAttendanceReportUpdate" />} label="send Attendance Report Update" />
                    <FormControlLabel control={<Checkbox checked={checkBoxValues.sendSalaryCalculationUpdate} onChange={handleCheckboxChange} name="sendSalaryCalculationUpdate" />} label="send Salary Calculation Update" />
                    <FormControlLabel control={<Checkbox checked={checkBoxValues.sendPaymentTransferConfirmation} onChange={handleCheckboxChange} name="sendPaymentTransferConfirmation" />} label="send Payment Transfer Confirmation" />
                </Box>
                <Button variant="contained" color="success" onClick={onsubmit} />

            </FormGroup>
        </>
    );
}