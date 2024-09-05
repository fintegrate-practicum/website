import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

interface TextFieldProps {
  id?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  label?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  disabled?: boolean;
  margin?: 'none' | 'dense' | 'normal';
  InputProps?: Partial<React.ComponentProps<typeof TextField>>;
  sx?: object;
}

const CustomTextField: React.FC<
  React.ComponentProps<typeof TextField> & TextFieldProps
> = ({
  id,
  variant = 'outlined',
  label,
  value = '',
  onChange,
  disabled = false,
  margin = 'normal',
  InputProps,
  sx,
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <TextField
      id={id}
      variant={variant}
      label={label}
      value={internalValue}
      onChange={handleChange}
      disabled={disabled}
      margin={margin}
      InputProps={InputProps}
      sx={sx}
    />
  );
};

export default CustomTextField;
