import { describe, test, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MySetting, { ComponentType } from '../components/Setting/MySetting';
import Button from '@mui/material/Button';

describe('<MySetting>', () => {
  // test.each(Object.values(ComponentType))(

  //   'renders the component for type %s',
  //   (type) => {
  //     const { container } = render(
  //       <MySetting
  //         setting={{
  //           settingDesc: "Test description",
  //           type: type,
  //           props: {},
  //         }}
  //       />
  //     );
  //     expect(container.firstChild).not.toBeNull();
  //   }
  // );

  // test('renders component with props', () => {
  //   render(
  //     <MySetting
  //       setting={{
  //         settingDesc: "Test description",
  //         type: ComponentType.Button,
  //         props: { 'data-testid': 'test-button', disabled: true },
  //       }}
  //     />
  //   );
  //   const button = screen.getByTestId('test-button');
  //   expect(button).not.toBeNull();
  //   expect(button).toHaveProperty('disabled', true);
  // });

  

  

  // test('renders component with children', () => {
  //   render(
  //     <MySetting
  //       setting={{
  //         settingDesc: "Test description",
  //         type: ComponentType.Button,
  //         props: {},
  //         children: "Click me",
  //       }}
  //     />
  //   );
  //   const childElement = screen.getByText('Click me');
  //   expect(childElement).not.toBeNull();
  // });




  // test('renders null for invalid component type', () => {
  //   const { container } = render(
  //     <MySetting
  //       setting={{
  //         settingDesc: "Test description",
  //         type: "InvalidType" as ComponentType,
  //         props: {},
  //       }}
  //     />
  //   );
  //   expect(container.firstChild).toBeNull();
  // });



  // test('does not render without required props', () => {
  //   const { container } = render(
  //     <MySetting props={}/>
  //   );
  //   expect(container.firstChild).toBeNull();
  // });



  // test('renders ButtonGroup component with children', async () => {
  //   const { container } = render(
  //     <MySetting
  //       setting={{
  //         settingDesc: "Test description",
  //         type: ComponentType.ButtonGroup,
  //         props: { variant: 'contained' },
  //         children: [
  //           { key: '1', value: '1' },
  //           { key: '2', value: '2' }
  //         ],
  //       }}
  //     />
  //   );
  
  //   const childButtons = container.querySelectorAll('button');
  //   expect(childButtons.length).toBe(2);
  //   expect(childButtons[0].textContent).toBe('1');
  //   expect(childButtons[1].textContent).toBe('2');
  // });
  

  //fall
  test('renders Select component with MenuItem children', async () => {
     render(
      <MySetting
        setting={{
          settingDesc: "Test description",
          type: ComponentType.Select,
          props: { value: 'option1', onChange: () => {} },
          children: [
            { key: 'option1', value: 'option1', string: 'option1' },
            { key: 'option2', value: 'option2', string: 'option2' }
          ],
        }}
      />
    );
  
    // Try to find the select element using the role attribute
    const selectElement = screen.getByRole("combobox");
   
    expect(selectElement).toBeTruthy();
    fireEvent.click(selectElement);
    const selectElement1 = screen.getByRole('presentation');
    // Try to find option elements
    // const optionElements = screen.getAllByRole('option');
    // expect(optionElements.length).toBe(2);
    // expect(optionElements[0].textContent).toBe('option1');
    // expect(optionElements[1].textContent).toBe('option2');
  });
  
  


//   test('renders FloatingActionButton component with children', async () => {
//    render(
//       <MySetting
//         setting={{
//           settingDesc: "Test description",
//           type: ComponentType.FloatingActionButton,
//           props: { color: 'primary' },
//           children: 'FAB',
//         }}
//       />
//     );
  
//     const fabButton = screen.getByText('FAB');
//     expect(fabButton).toBeTruthy();
//     expect(fabButton.textContent).toBe('FAB');
//   });

// //fall
//   test('renders RadioGroup component with children', async () => {
//     const { container } = render(
//       <MySetting
//         setting={{
//           settingDesc: "Test description",
//           type: ComponentType.RadioGroup,
//           props: { name: 'radio-group' },
//           children: [
//             { value: 'option1', label: 'Option 1' },
//             { value: 'option2', label: 'Option 2' }
//           ],
//         }}
//       />
//     );
  
//     // Try to find the radio group by role
//     const radioGroup = container.querySelector('[role="radiogroup"]');
//     expect(radioGroup).toBeTruthy();
  
//     // Try to find radio buttons
//     const radioButtons = container.querySelectorAll('input[type="radio"]');
//     expect(radioButtons.length).toBe(2);
//     expect(radioButtons[0].nextSibling?.textContent).toBe('Option 1');
//     expect(radioButtons[1].nextSibling?.textContent).toBe('Option 2');
//   });
  
  


//   test('reacts to prop changes', async () => {
//     const { rerender } = render(
//       <MySetting
//         setting={{
//           settingDesc: "Test description",
//           type: ComponentType.Button,
//           props: { 'data-testid': 'test-button', disabled: true },
//         }}
//       />
//     );

//     const button = screen.getByTestId('test-button');
//     expect(button).toHaveProperty('disabled', true);

//     rerender(
//       <MySetting
//         setting={{
//           settingDesc: "Test description",
//           type: ComponentType.Button,
//           props: { 'data-testid': 'test-button', disabled: false },
//         }}
//       />
//     );
//     expect(button).toHaveProperty('disabled', false);
//   });




  test('handles user interaction', async () => {
    const handleClick = vi.fn();
    render(
      <MySetting
        setting={{
          settingDesc: "Test description",
          type: ComponentType.Button,
          props: { 'data-testid': 'test-button', onClick: handleClick },
          children: "Click me",
        }}
      />
    );
    const button = screen.getByTestId('test-button');
    expect(button).not.toBeNull();
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});


