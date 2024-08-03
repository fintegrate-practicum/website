import MaterialTypography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React from 'react';
import theme from '../../../Theme';

interface TypographyProps {
    variant?: "h1"|"h4"|"h5"|"h6"|"subtitle1" |"body1" | "body2" | "button";
    children?: React.ReactNode;
    component?: string;
    gutterBottom?: boolean;
    paragraph?: boolean;
    align?:string;
    color?: "primary"|"secondary" | "success"  | "textSecondary" | "error";
    style?: React.CSSProperties;

}

const Typography = (props: TypographyProps) => {
    const {
        variant="body1",
        children,
        component='span',
        gutterBottom = false,
        paragraph=true,
        align,
        color,
        style,
    } = props;
  
   
   
        return (
            <>
                <MaterialTypography 
                gutterBottom={gutterBottom}
                variant={variant}
                component={component}
                align={align}
                color={color}
                style={style}>
             
                    {children}
                </MaterialTypography>
                {paragraph &&<br />}
                </>
        
        );
 
};

export default Typography;