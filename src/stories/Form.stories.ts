import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Form } from './Form';

export default {
  title: 'Example/Form', // Update the title to group it under "Example"
  component: Form,
} as Meta;

interface FormData {
  value: string;
}

type TemplateProps = {
  onSubmit: (formData: FormData) => void;
};

const Template: Story<TemplateProps> = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: (formData) => {
    // Handle form submission
    console.log(formData);
  },
};