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
        isLink,
        value,
        type,
        color,
        disabled,
        size,
        variant,
        component,
        tabIndex,
        children

    } = props;
    const actualValue = value || "התחברות";
    const actualType = type || 'button';
    const actualColor = color || 'primary';
    const actualIsLink = isLink || false;
    const actualDisabled = disabled || false;
    const actualSize = size || 'medium';
    const actualVariant = variant || 'contained';
    const actualComponent = component || 'button';
    const actualTabIndex = tabIndex || 1;
    if (actualIsLink==true) {
        return <Link href={href}>{actualValue}</Link>;
    }

    else {
        return (
            <div>
                <MaterialButton
                    onClick={onClick}
                    type={actualType}
                    disabled={actualDisabled}
                    variant={actualVariant}
                    size={actualSize}
                    component={actualComponent}
                    color={actualColor}
                    tabIndex={actualTabIndex}
                >
                    {actualValue}
                    {children}
                </MaterialButton>
            </div>
        );
    }
};

export default Button;