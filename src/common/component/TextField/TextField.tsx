
import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

const CustomTextField: React.FC<TextFieldProps> = ({ id, variant, label, value, onChange, disabled, margin, InputProps, sx, ...rest }) => {
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
      {...rest} // Spread the rest of the props
    />
  );
};

export default CustomTextField;
