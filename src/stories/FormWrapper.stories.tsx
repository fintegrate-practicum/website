import { Meta, StoryFn } from '@storybook/react';
import FormWrapper from './FormWrapper';
import { FieldValues } from 'react-hook-form';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof FormWrapper> = {
  title: 'Components/FormWrapper',
  component: FormWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    formWidth: {
      control: { type: 'select' },
      options: ['short', 'medium', 'long'],
    },
    onSubmit: { action: 'submitted' },
  },
};

export default meta;

const Template: StoryFn<typeof FormWrapper> = (args) => {
  const handleSubmit = (data: FieldValues) => {
    action('submitted')(data);
  };

  return <FormWrapper {...args} onSubmit={handleSubmit} />;
};

export const Default = Template.bind({});
Default.args = {
  fields: [
    {
      name: 'companyNumber',
      label: 'Company Number',
      type: 'text',
      validation: {
        required: 'Company number is required',
        pattern: {
          value: /^516[0-9]{6}$/i,
          message: 'Company number must start with 516 and contain 9 digits',
        },
      },
    },
    {
      name: 'name',
      label: 'Business Name',
      type: 'text',
      validation: {
        required: 'Business name is required',
        pattern: {
          value: /^[A-Z]{2,30}$/i,
          message: 'Business name must contain more than 2 and less than 30 characters',
        },
      },
    },
    {
      name: 'email',
      label: 'Business Email',
      type: 'email',
      validation: {
        required: 'Email is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address',
        },
      },
    },
    {
      name: 'terms',
      label: 'Accept Terms',
      type: 'checkbox',
    },
    {
      name: 'fileUpload',
      label: 'Upload File',
      type: 'file',
    },
    {
      name: 'selectOption',
      label: 'Select Option',
      type: 'select',
      options: ['Option 1', 'Option 2', 'Option 3'],
    },
  ],
  formWidth: 'short',
};
