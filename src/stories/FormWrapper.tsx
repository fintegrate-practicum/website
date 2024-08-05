// import React, { useState } from 'react';
// import { useForm, FieldValues } from 'react-hook-form';
// import { Box, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox } from '@mui/material';
// import './form.css';

// interface Field {
//   name: string;
//   label: string;
//   type: string;
//   validation?: any;
//   options?: string[];
// }

// interface FormWrapperProps {
//   fields: Field[];
//   onSubmit: (data: FieldValues) => void;
//   formWidth?: 'short' | 'medium' | 'long'; 
// }

// const FormWrapper: React.FC<FormWrapperProps> = ({ fields, onSubmit, formWidth = 'medium' }) => {
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm();
//   const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Box
//       component="form"
//       onSubmit={handleSubmit(onSubmit)}
//       className={`form form-${formWidth}`}
//     >
//       {fields.map((field) => (
//         <div key={field.name} className="form-group">
//           {field.type === 'text' || field.type === 'email' ? (
//             <TextField
//               id={field.name}
//               label={field.label}
//               type={field.type}
//               defaultValue=""
//               fullWidth
//               {...register(field.name, field.validation)}
//             />
//           ) : field.type === 'select' ? (
//             <FormControl fullWidth>
//               <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
//               <Select
//                 labelId={`${field.name}-label`}
//                 id={field.name}
//                 defaultValue=""
//                 label={field.label}
//                 {...register(field.name, field.validation)}
//               >
//                 {field.options?.map((option) => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           ) : field.type === 'file' ? (
//             <>
//               <input
//                 type="file"
//                 onChange={(e) => handleFileChange(e, field.name)}
//               />
//               {selectedImage && (
//                 <Box mt={2}>
//                   <img
//                     src={selectedImage as string}
//                     alt="Preview"
//                     style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
//                   />
//                 </Box>
//               )}
//             </>
//           ) : field.type === 'checkbox' ? (
//             <FormControlLabel
//               control={<Checkbox {...register(field.name, field.validation)} />}
//               label={field.label}
//             />
//           ) : null}
//           {errors[field.name] && <Typography color="error">{errors[field.name].message}</Typography>}
//         </div>
//       ))}
//       <Button variant="contained" color="success" type="submit">
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default FormWrapper;

import React, { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { Box, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import './form.css';

interface Field {
  name: string;
  label: string;
  type: string;
  validation?: any;
  options?: string[];
}

interface FormWrapperProps {
  fields: Field[];
  onSubmit: (data: FieldValues) => void;
  formWidth?: 'short' | 'medium' | 'long'; 
}

const FormWrapper: React.FC<FormWrapperProps> = ({ fields, onSubmit, formWidth = 'medium' }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className={`form form-${formWidth} form-margin-top`}
    >
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          {field.type === 'text' || field.type === 'email' ? (
            <TextField
              id={field.name}
              label={field.label}
              type={field.type}
              {...register(field.name, field.validation)}
            />
          ) : field.type === 'select' ? (
            <FormControl>
              <InputLabel id={`${field.name}-label`}>{field.label}</InputLabel>
              <Select
                labelId={`${field.name}-label`}
                id={field.name}
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
            <>
              <label htmlFor={field.name} className="custom-file-upload">
                {field.label}
              </label>
              <input
                id={field.name}
                type="file"
                {...register(field.name, field.validation)}
                onChange={handleFileChange}
              />
              {selectedImage && (
                <Box mt={2}>
                  <img
                    src={selectedImage as string}
                    alt="Preview"
                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
                  />
                </Box>
              )}
            </>
          ) : field.type === 'checkbox' ? (
            <FormControlLabel
              control={<Checkbox {...register(field.name, field.validation)} />}
              label={field.label}
            />
          ) : null}
          {errors[field.name] && <Typography color="error">{errors[field.name]?.message}</Typography>}
        </div>
      ))}
      <Button variant="contained" color="success" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default FormWrapper;


