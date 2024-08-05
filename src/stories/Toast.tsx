import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { CheckCircle as CheckCircleIcon, Info as InfoIcon, Warning as WarningIcon, Error as ErrorIcon } from '@mui/icons-material';
import{} from './toast.css';

interface ToastProps {
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  open: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, severity = 'info', open, onClose }) => {
  const getSeverityClass = (severity: 'success' | 'info' | 'warning' | 'error') => {
    switch (severity) {
      case 'success':
        return 'toastSuccess';
      case 'info':
        return 'toastInfo';
      case 'warning':
        return 'toastWarning';
      case 'error':
        return 'toastError';
      default:
        return '';
    }
  };

  const getSeverityIcon = (severity: 'success' | 'info' | 'warning' | 'error') => {
    switch (severity) {
      case 'success':
        return <CheckCircleIcon className="toastIcon" />;
      case 'info':
        return <InfoIcon className="toastIcon" />;
      case 'warning':
        return <WarningIcon className="toastIcon" />;
      case 'error':
        return <ErrorIcon className="toastIcon" />;
      default:
        return null;
    }
  };

  return (
    <div className="toastContainer">
      <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
        <Alert
          onClose={onClose}
          className={`toastAlert ${getSeverityClass(severity)}`}
          icon={false} // Hide default icon
        >
          {getSeverityIcon(severity)}
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toast;
