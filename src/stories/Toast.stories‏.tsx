import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Toast, { ToastProps } from './Toast‏';

export default {
    title: 'Components/Toast',
    component: Toast,
} as Meta;

const Template: StoryFn<ToastProps> = (args) => {
    const [open, setOpen] = useState(args.open);

    const handleClose = () => {
        setOpen(false);
        action('onClose')();
    };

    return <Toast {...args} open={open} onClose={handleClose} />;
};

export const Success = Template.bind({});
Success.args = {
    message: 'This is a success message!',
    severity: 'success',
    open: true,
    duration: 4000,
};

export const Info = Template.bind({});
Info.args = {
    message: 'This is an info message!',
    severity: 'info',
    open: true,
    duration: 4000,
};

export const Warning = Template.bind({});
Warning.args = {
    message: 'This is a warning message!',
    severity: 'warning',
    open: true,
    duration: 4000,
};

export const Error = Template.bind({});
Error.args = {
    message: 'This is an error message!',
    severity: 'error',
    open: true,
    duration: 4000,
};
