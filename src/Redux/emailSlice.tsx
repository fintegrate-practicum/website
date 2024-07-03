import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import email from "../classes/email";
import axios from "axios";


const initialState = {
    email: {
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
    }
}
export const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
    }
});

export const changeSettingEmail = createAsyncThunk('', async (_email:email) => {
    try {

        const response = await axios.post('http://localhost:4156/email-settings', _email);  
        console.log(response)      
        return response.data

    } catch (error: any) {
        if (error.response.data.statusCode == 400)
            alert(error.response.data.message);
        return error
    }
});

export const { } = emailSlice.actions;

export default emailSlice.reducer;