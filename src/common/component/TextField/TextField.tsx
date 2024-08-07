import { TextField } from '@mui/material';
import React from 'react';
interface TextFieldProps  {
  id?: string;
  variant?: "filled" | "outlined" | "standard";
  label?: string;
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  disabled?: boolean;
  margin?: "none" | "dense" | "normal";
  InputProps?: Partial<React.ComponentProps<typeof TextField>>;
  sx?: object;
}

  const CustomTextField = (props: React.ComponentProps<typeof TextField> & TextFieldProps) => {
  const {
    id,
    variant = 'outlined',
    label,
    value,
    onChange,
    disabled = false,
    margin = 'normal',
    InputProps,
    sx,
  } = props;
  return (
    <TextField
      id={id}
      variant={variant}
      label={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      margin={margin}
      InputProps={InputProps}
      sx={sx}
    />
  );
};
export default CustomTextField;




// import React, { useState } from 'react';
// import { TextField } from '@mui/material';
// interface CustomTextFieldProps {
//   id?: string;
//   variant?: "filled" | "outlined" | "standard";
//   label?: string;
//   value?: any;
//   onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
//   disabled?: boolean;
//   margin?: "none" | "dense" | "normal";
//   InputProps?: Partial<React.ComponentProps<typeof TextField>>;
//   sx?: object;
// }
// const CustomTextField: React.FC<CustomTextFieldProps> = (props) => {
//   const {
//     id,
//     variant = 'outlined',
//     label,
//     value,
//     onChange,
//     disabled = false,
//     margin = 'normal',
//     InputProps,
//     sx,
//     ...rest
//   } = props;
//   return (
//     <TextField
//       id={id}
//       variant={variant}
//       label={label}
//       value={value}
//       onChange={onChange}
//       disabled={disabled}
//       margin={margin}
//       InputProps={InputProps}
//       sx={sx}
//       {...rest}
//     />
//   );
// };
// const ParentComponent = () => {
//   const [value, setValue] = useState('');
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValue(event.target.value);
//   };
//   return (
//     <CustomTextField
//       id="custom-text-field"
//       label="Custom Text Field"
//       value={value}
//       onChange={handleChange}
//       variant="outlined"
//       margin="normal"
//     />
//   );
// };
// export default ParentComponent;