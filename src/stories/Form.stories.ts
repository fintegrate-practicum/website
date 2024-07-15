import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Form from './Form';

export default {
  title: 'Components/Form',
  component: Form,
} as Meta;

interface FormData {
  value: string;
}

const Template: Story = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: (formData: FormData) => {
    // Handle form submission
    console.log(formData);
  },
};