import MaterialButton from '@mui/material/Button';
import theme from './src/Theme';
import React from 'react';
interface ButtonProps {
	onClickFunction: () => void;
	value: string | number;
}
const Button = (props: ButtonProps) => {
	return (
		<MaterialButton
			onClick={props.onClickFunction}
			style={{
				backgroundColor: theme.palette.secondary.dark,
				borderColor: theme.palette.info.main,
				outlineColor: theme.palette.info.main,
				color: theme.palette.info.main,
			}}
		>
			{props.value}
		</MaterialButton>
	);
};
export default Button;
