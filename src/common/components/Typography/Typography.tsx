import MaterialTypography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React from 'react';
import theme from '../../../Theme';

type ElementType<T extends React.ElementType> =
  T extends keyof JSX.IntrinsicElements ? T : React.ComponentType<any>;

interface TypographyProps {
    variant?: "h1"|"h4"|"h5"|"h6"|"h2"|"subtitle1" |"body1" | "body2" ;
    children?: React.ReactNode;
    component?: React.ElementType<any>;
    gutterBottom?: boolean;
    align?:"center" | "left" | "right" | "inherit" ;
    color?: "primary"|"secondary" | "success"  | "textSecondary" | "error" | "black";
    style?: React.CSSProperties;
    className?:string

}

const Typography = (props: TypographyProps) => {
    const {
        variant="body1",
        children,
        component= "div",
        gutterBottom = false,
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
                </>
        
        );
 
};

export default Typography;