// import React, { ReactElement } from 'react';
// import { TypographyProps } from '@mui/material/Typography';

// // קומפוננטה גנרית שמקבלת רכיב מסוג MUI
// function GenericComponent<C extends React.ElementType>(
//   props: TypographyProps<C, { component?: C }>,
// ): ReactElement {
//   const { component: Component, children, ...other } = props;

//   if (!Component) {
//     return null; // או משהו אחר במקרה שלא קיבלנו רכיב
//   }

//   return <Component {...other}>{children}</Component>;
// }

// export default GenericComponent;
import { ComponentProps,ElementType} from 'react';

// קומפוננטה גנרית
function GenericComponent<C extends ElementType>(
  props: ComponentProps<C>
) {
  const { children, ...rest } = props;
  const Component = props.component;

  // אם אין קומפוננטה, נחזיר null
  if (!Component) return null;

  // אם יש קומפוננטה, נחזיר את הקומפוננטה עם ה-props המתאימים
  return <Component {...rest}>{children}</Component>;
}
export default GenericComponent
