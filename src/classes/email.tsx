class email {
    sendRecruitmentNotification!: Boolean;
    sendCVReceiptNotification!: Boolean;
    sendInterviewConfirmation!: Boolean;
    sendRecruitmentStatusUpdate!: Boolean;
    sendTaskAssignment!: Boolean;
    sendTaskStatusUpdate!: Boolean;
    sendApprovalRequest!: Boolean;
    sendFeedbackToEmployee!: Boolean;
    sendNewCourseNotification!: Boolean;
    sendTrainingInvitation!: Boolean;
    sendTrainingStatusUpdate!: Boolean;
    sendAttendanceReportUpdate!: Boolean;
    sendSalaryCalculationUpdate!: Boolean;
    sendPaymentTransferConfirmation!: Boolean;


    constructor(sendRecruitmentNotification: Boolean,
        sendCVReceiptNotification: Boolean,
        sendInterviewConfirmation: Boolean,
        sendRecruitmentStatusUpdate: Boolean,
        sendTaskAssignment: Boolean,
        sendTaskStatusUpdate: Boolean,
        sendApprovalRequest: Boolean,
        sendFeedbackToEmployee: Boolean,
        sendNewCourseNotification: Boolean,
        sendTrainingInvitation: Boolean,
        sendTrainingStatusUpdate: Boolean,
        sendAttendanceReportUpdate: Boolean,
        sendSalaryCalculationUpdate: Boolean,
        sendPaymentTransferConfirmation: Boolean,) {

        this.sendRecruitmentNotification = sendRecruitmentNotification;
        this.sendCVReceiptNotification = sendCVReceiptNotification;
        this.sendInterviewConfirmation = sendInterviewConfirmation;
        this.sendRecruitmentStatusUpdate = sendRecruitmentStatusUpdate;
        this.sendTaskAssignment = sendTaskAssignment;
        this.sendTaskStatusUpdate = sendTaskStatusUpdate;
        this.sendApprovalRequest = sendApprovalRequest;
        this.sendFeedbackToEmployee = sendFeedbackToEmployee;
        this.sendNewCourseNotification = sendNewCourseNotification;
        this.sendTrainingInvitation = sendTrainingInvitation;
        this.sendTrainingStatusUpdate = sendTrainingStatusUpdate;
        this.sendAttendanceReportUpdate = sendAttendanceReportUpdate;
        this.sendSalaryCalculationUpdate = sendSalaryCalculationUpdate;
        this.sendPaymentTransferConfirmation = sendPaymentTransferConfirmation;
    }

}
export default email