import MaterialButton from '@mui/material/Button';
import Link from '@mui/material/Link';
import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    href?: string;
    isLink?: boolean;
    value?: string | number;
    color?: "primary"|"secondary" | "success";
    component?:"button" | "label" | "span" ;
    type?: 'button' | 'submit' | 'reset' | 'span';
    disabled?:boolean;
    size?:"small"|"medium"|"large"   
    variant?:"outlined"|"contained" ;
    tabIndex?: -1|1
    children?: React.ReactNode;
}

const Button = (props: ButtonProps) => {
    const {
        onClick,
        href,
        isLink=false,
        value="התחברות",
        type='button',
        color='primary',
        disabled=false,
        size='medium',
        variant='contained',
        component='button',
        tabIndex=1,
        children

    } = props;

   
    if (isLink==true) {
        return <Link href={href}>{value}</Link>;
    }

    else {
        return (
            <div>
                <MaterialButton
                    onClick={onClick}
                    type={type}
                    disabled={disabled}
                    variant={variant}
                    size={size}
                    component={component}
                    color={color}
                    tabIndex={tabIndex}
                >
                    {value}
                    {children}
                </MaterialButton>
            </div>
        );
    }
};

export default Button;