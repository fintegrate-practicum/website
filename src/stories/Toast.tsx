import React from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material';
import { CheckCircle as CheckCircleIcon, Info as InfoIcon, Warning as WarningIcon, Error as ErrorIcon, Close as CloseIcon } from '@mui/icons-material';
import './toast.css';

interface ToastProps {
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  open: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, severity = 'info', open, onClose, duration = 6000 }) => {
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
      <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
        <Alert
          onClose={onClose}
          severity={severity}
          iconMapping={{
            success: getSeverityIcon('success'),
            info: getSeverityIcon('info'),
            warning: getSeverityIcon('warning'),
            error: getSeverityIcon('error'),
          }}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={onClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Toast;
