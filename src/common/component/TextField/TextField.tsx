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