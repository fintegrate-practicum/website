// import React from 'react';
// import { StoryFn, Meta } from '@storybook/react';
// import FormWrapper from './FormWrapper';
// import { TextField, Button, Typography } from '@mui/material';
// import { FieldValues } from 'react-hook-form';

// export default {
//   title: 'Components/FormWrapper',
//   component: FormWrapper,
// } as Meta;

// const Template: StoryFn = (args) => (
//   <FormWrapper {...args}>
//     {(register, errors) => (
//       <>
//         <div>
//           <TextField
//             id="outlined-basic"
//             label="Company Number"
//             variant="outlined"
//             {...register("companyNumber", { required: true, pattern: /^516[0-9]{6}$/i })}
//           />
//           {errors.companyNumber && (
//             <Typography
//               style={{
//                 fontWeight: "bold",
//                 fontSize: 10,
//                 color: "red"
//               }}
//             >
//               מספר חברה מתחיל ב-516 ומכיל 9 ספרות
//             </Typography>
//           )}
//         </div>
//         <div>
//           <TextField
//             id="outlined-basic"
//             label="Business Name"
//             variant="outlined"
//             {...register("name", { required: true, pattern: /^[A-Z]{2,30}$/i })}
//           />
//           {errors.name && (
//             <Typography
//               style={{
//                 fontWeight: "bold",
//                 fontSize: 10,
//                 color: "red"
//               }}
//             >
//               שם החברה מכיל יותר מ-2 אותיות ופחות מ-30
//             </Typography>
//           )}
//         </div>
//         <div>
//           <TextField
//             id="outlined-basic"
//             label="Business Email"
//             variant="outlined"
//             {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
//           />
//           {errors.email && (
//             <Typography
//               style={{
//                 fontWeight: "bold",
//                 fontSize: 10,
//                 color: "red"
//               }}
//             >
//               מייל לא תקין
//             </Typography>
//           )}
//         </div>
//         <Button variant="contained" color="success" type='submit'>Submit</Button>
//       </>
//     )}
//   </FormWrapper>
// );

// export const Default = Template.bind({});
// Default.args = {
//   onSubmit: (values: FieldValues) => {
//     console.log(values);
//   },
// };


import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import FormWrapper from './FormWrapper';
import { FieldValues } from 'react-hook-form';

export default {
  title: 'Components/FormWrapper',
  component: FormWrapper,
} as Meta;

const Template: StoryFn = (args) => <FormWrapper {...args} />;

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
