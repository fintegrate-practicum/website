import MaterialButton from '@mui/material/Button';
import Link from '@mui/material/Link';

interface ButtonProps {
    onClick?: () => void;
    href?: string;
    isLink: boolean;
    value: string | number;
    backgroundColor?: '#4F5902'| '#F2B704' | '#F2CB05' | '#380273'| '#6503A6' | 'white';
    borderColor?: '#4F5902'| '#F2B704' | '#F2CB05' | '#380273'| '#6503A6' ;
    border?: string;
    outlineColor?: '#4F5902'| '#F2B704' | '#F2CB05' | '#380273'| '#6503A6' ;
    color: '#4F5902'| '#F2B704' | '#F2CB05' | '#380273'| '#6503A6' | 'white';
    type?: 'button' | 'submit' | 'reset';
}

const Button = (props: ButtonProps) => {
    if (props.isLink) {
        return (
            <Link href={props.href}>{props.value}</Link>
        );
    } else {
        return (
            <MaterialButton
                onClick={props.onClick}
                type={props.type || 'button'}
                style={{
                    backgroundColor: props.backgroundColor,
                    borderColor: props.borderColor,
                    border: props.border,
                    outlineColor: props.outlineColor,
                    color: props.color
                }}
            >
                {props.value}
            </MaterialButton>
        );
    }
};

export default Button;