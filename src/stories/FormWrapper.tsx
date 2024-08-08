import React, { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import {
	Box,
	Button,
	TextField,
	Typography,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	FormControlLabel,
	Checkbox,
} from '@mui/material';

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

const FormWrapper: React.FC<FormWrapperProps> = ({
	fields,
	onSubmit,
	formWidth = 'medium',
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(
		null,
	);
	const [fileName, setFileName] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setFileName(file.name);
			const reader = new FileReader();
			reader.onloadend = () => {
				setSelectedFile(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '2vh',
				margin: '0 auto',
				padding: '2vh',
				border: 1,
				borderColor: 'divider',
				borderRadius: '1vh',
				boxShadow: 1,
				maxWidth:
					formWidth === 'short'
						? '20vw'
						: formWidth === 'medium'
							? '50vw'
							: '100vw',
			}}
		>
			{fields.map((field) => (
				<Box
					key={field.name}
					sx={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}
				>
					{field.type === 'text' || field.type === 'email' ? (
						<TextField
							id={field.name}
							label={field.label}
							type={field.type}
							{...register(field.name, field.validation)}
							error={!!errors[field.name]}
							helperText={errors[field.name]?.message?.toString()}
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
							<label
								htmlFor={field.name}
								style={{
									display: 'inline-block',
									padding: '1vh 2vw',
									cursor: 'pointer',
									backgroundColor: '#007bff',
									color: 'white',
									borderRadius: '1vh',
								}}
							>
								{field.label}
							</label>
							<input
								id={field.name}
								type='file'
								{...register(field.name, field.validation)}
								onChange={handleFileChange}
								style={{ display: 'none' }}
							/>
							{fileName && (
								<Box mt={2}>
									{selectedFile && fileName.match(/\.(jpg|jpeg|png|gif)$/) ? (
										<img
											src={selectedFile as string}
											alt='Preview'
											style={{
												maxWidth: '20vw',
												maxHeight: '20vh',
												objectFit: 'contain',
											}}
										/>
									) : (
										<Typography>{fileName}</Typography>
									)}
								</Box>
							)}
						</>
					) : field.type === 'checkbox' ? (
						<FormControlLabel
							control={<Checkbox {...register(field.name, field.validation)} />}
							label={field.label}
						/>
					) : null}
				</Box>
			))}
			<Button
				variant='contained'
				color='success'
				type='submit'
				sx={{ marginTop: '2vh' }}
			>
				Submit
			</Button>
		</Box>
	);
};

export default FormWrapper;
