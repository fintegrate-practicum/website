import MaterialButton from '@mui/material/Button';
import Link from '@mui/material/Link';

interface ButtonProps {
    onClick?: () => void;
    href?: string;
    isLink: boolean;
    value?: string | number;
    backgroundColor?: '#4F5902' | '#F2B704' | '#F2CB05' | '#380273' | '#6503A6' | 'white';
    borderColor?: '1px solid #4F5902' | '1px solid #F2B704' | '1px solid #F2CB05' | '1px solid #380273' | '1px solid #6503A6' |'1px double #4F5902' | '1px double #F2B704' | '1px double #F2CB05' | '1px double #380273' | '1px double #6503A6';
    outlineColor?: '#4F5902' | '#F2B704' | '#F2CB05' | '#380273' | '#6503A6';
    color?: '#4F5902' | '#F2B704' | '#F2CB05' | '#380273' | '#6503A6' | 'white';
    type?: 'button' | 'submit' | 'reset';
}

const Button = (props: ButtonProps) => {
    const {
        onClick,
        href,
        isLink,
        value,
        type,
        backgroundColor,
        borderColor,
        outlineColor,
        color
    } = props;
    const actualValue = value || "התחברות";
    const actualType = type || 'button';
    const actualBackgroundColor = backgroundColor || '#6503A6';
    const actualBorderColor = borderColor || '1px solid #380273';
    const actualColor = color || 'white';
    const actualOutlineColor = outlineColor || 'F2B704';
    const actualisLink = isLink || false;

    if (actualisLink) {
        return <Link href={href}>{actualValue}</Link>;
    } else {
        return (
            <MaterialButton
                onClick={onClick}
                type={actualType}
                style={{
                    backgroundColor: actualBackgroundColor,
                    borderColor: actualBorderColor,
                    outlineColor: actualOutlineColor,
                    color: actualColor
                }}
            >
                {actualValue}
            </MaterialButton>
        );
    }
};

export default Button;