import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import FormWrapper, { FormWrapperProps } from './FormWrapper';
import { FieldValues } from 'react-hook-form';

export default {
  title: 'Components/FormWrapper',
  component: FormWrapper,
} as Meta;

const Template: StoryFn = (args) => <FormWrapper fields={[]} onSubmit={function (data: FieldValues): void {
  throw new Error('Function not implemented.');
} } {...args} />;

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
  ],
  onSubmit: (values: FieldValues) => {
    console.log(values);
  },
};