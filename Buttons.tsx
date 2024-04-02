 import Button from '@mui/material/Button';
 import React from 'react';

const Buttons = (props: { value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
    return (
        <Button style={{
            backgroundColor: "#F2CB05",
            borderColor: "#4F5902",
            outlineColor: "#4F5902",
            color: "#4F5902"
        }}
            variant="contained" >{props.value}</Button>
    )
}
export default Buttons;
// import React from 'react';
// import { render } from '@testing-library/react';
// import Buttons from './Buttons';

// test('Buttons component renders with correct value prop', () => {
//   const testValue = 'Click Me';
//   const { getByText } = render(<Buttons value={testValue} />);

//   const buttonElement = getByText(testValue);

//   expect(buttonElement).toBeInTheDocument();
//   expect(buttonElement).toHaveStyle({
//     backgroundColor: '#F2CB05',
//     borderColor: '#4F5902',
//     outlineColor: '#4F5902',
//     color: '#4F5902',
//   });
// });

// export default Buttons;