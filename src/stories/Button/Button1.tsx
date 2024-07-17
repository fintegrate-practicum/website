
import MaterialButton from '@mui/material/Button';
import theme from '../../Theme';
import React from 'react';
interface ButtonProps {
    onClickFunction: () => void;
    value: string | number;
    backgroundColor: string,
    borderColor: string,
    outlineColor:string,
    color: string
}
const Button1 = (props: ButtonProps) => {
    
    return (
        <MaterialButton onClick={props.onClickFunction}
         style={{
            backgroundColor: props.backgroundColor,
            borderColor:  props.borderColor,
            outlineColor: props.outlineColor,
            color: props.color
        }}
        >
        {props.value}
        </MaterialButton>
    )
}
export default Button1;
