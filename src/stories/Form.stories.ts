import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Form } from './Form';

export default {
  title: 'Example/Form',
  component: Form,
} as Meta;

interface FormData {
  value: string;
}

type TemplateProps = {
  onSubmit: (formData: FormData) => void;
};

const Template: Story<TemplateProps> = (args) => <Form {...args} />;

export const Login = Template.bind({});
Login.args = {
  onSubmit: (formData) => {
    // Handle login form submission
    console.log('Logged in:', formData);
  },
};

export const Logout = Template.bind({});
Logout.args = {
  onSubmit: (formData) => {
    // Handle logout form submission
    console.log('Logged out:', formData);
  },
};