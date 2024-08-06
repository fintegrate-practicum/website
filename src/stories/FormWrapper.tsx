import React, { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { Box, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

interface Field {
  name: string;
  label: string;
  type: string;
  validation?: any;
  options?: string[]; // For select and other custom inputs
}

interface FormWrapperProps {
  fields: Field[];
  onSubmit: (data: FieldValues) => void;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ fields, onSubmit }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(fieldName, reader.result, { shouldValidate: true });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="form">
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          {field.type === 'text' || field.type === 'email' ? (
            <TextField
              id={field.name}
              label={field.label}
              type={field.type}
              defaultValue=""
              fullWidth
              {...register(field.name, field.validation)}
            />
          ) : field.type === 'select' ? (
            <FormControl fullWidth>
              <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
              <Select
                labelId={`${field.name}-label`}
                id={field.name}
                defaultValue=""
                label={field.label}
                {...register(field.name, field.validation)}
              >
                {field.options?.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : field.type === 'file' ? (
            <input
              type="file"
              onChange={(e) => handleFileChange(e, field.name)}
            />
          ) : null}
          {errors[field.name] && (
            <Typography color="error">
              {errors[field.name]?.message?.toString()}
            </Typography>
          )}
        </div>
      ))}
      <Button variant="contained" color="success" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default FormWrapper;