import MaterialButton from '@mui/material/Button';
import Link from '@mui/material/Link';
import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    href?: string;
    isLink?: boolean;
    color?: "primary"|"secondary" | "success";
    component?:"button" | "label" | "span" ;
    type?: 'button' | 'submit' | 'reset' | 'span';
    disabled?:boolean;
    size?:"small"|"medium"|"large"   
    variant?:"outlined"|"contained" ;
    tabIndex?: -1|1
    children?: React.ReactNode;
    startIcon?: JSX.Element; 
    autoFocus?:boolean;
    value:string;

}

const Button = (props: ButtonProps) => {
    const {
        onClick,
        href,
        isLink=false,
        type='button',
        color='primary',
        disabled=false,
        size='medium',
        variant='contained',
        component='button',
        tabIndex=1,
        children,
        startIcon,
        autoFocus,
        value="התחברות"


    } = props;

   
    if (isLink==true) {
        return <Link href={href}>{children}{value}</Link>;
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
                    startIcon={startIcon}
                    autoFocus={autoFocus}

                >
                    {value}
                    {children}
                </MaterialButton>
            </div>
        );
    }
};

export default Button;