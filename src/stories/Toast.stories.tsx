import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Toast,  {ToastProps}  from './Toast';

export default {
  title: 'Components/Toast',
  component: Toast,
} as Meta;

const Template: StoryFn<ToastProps> = (args : any) => {
  const [open, setOpen] = useState(args.open);
  const handleClose = () => setOpen(false);

  return (
    <Toast
      {...args}
      open={open}
      onClose={handleClose}
    />
  );
};

export const Success = Template.bind({});
Success.args = {
  message: 'This is a success message!',
  severity: 'success',
  open: true,
};

export const Info = Template.bind({});
Info.args = {
  message: 'This is an info message!',
  severity: 'info',
  open: true,
};

export const Warning = Template.bind({});
Warning.args = {
  message: 'This is a warning message!',
  severity: 'warning',
  open: true,
};

export const Error = Template.bind({});
Error.args = {
  message: 'This is an error message!',
  severity: 'error',
  open: true,
};
