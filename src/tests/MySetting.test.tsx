import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MySetting, { ComponentType } from '../components/Setting/MySetting';
import Button from '@mui/material/Button';

describe('<MySetting>', () => {
  const componentsToTestWithoutChildren = Object.values(ComponentType).filter(
    (type) =>
      ![
        ComponentType.Button,
        ComponentType.ButtonGroup,
        ComponentType.FloatingActionButton,
        ComponentType.RadioGroup,
        ComponentType.Select,
      ].includes(type)
  );

  test.each(componentsToTestWithoutChildren)(
    'renders the component for type %s without children',
    (type) => {
      const { container } = render(
        <MySetting
          setting={{
            settingDesc: 'Test description',
            type: type,
            props: {},
          }}
        />
      );
      expect(container.firstChild).not.toBeNull();
    }
  );

  test('renders component with props', () => {
    render(
      <MySetting
        setting={{
          settingDesc: "Test description",
          type: ComponentType.Button,
          props: { 'data-testid': 'test-button', disabled: true },
          children:"clickme"
        }}
      />
    );
    const button = screen.getByTestId('test-button');
    expect(button).not.toBeNull();
    expect(button).toHaveProperty('disabled', true);
  });


  test('renders null for invalid component type', () => {
    const { container } = render(
      <MySetting
        setting={{
          settingDesc: "Test description",
          type: "InvalidType" as ComponentType,
          props: {},
        }}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  test('does not render without required props', () => {
    const { container } = render(
      <MySetting />
    );
    expect(container.firstChild).toBeNull();
  });

  test('renders component button with children', () => {
    render(
      <MySetting
        setting={{
          settingDesc: "Test description",
          type: ComponentType.Button,
          props: {},
          children: "Click me",
        }}
      />
    );
    const childElement = screen.getByText('Click me');
    expect(childElement).not.toBeNull();
  });

  
  test('renders ButtonGroup component with children', async () => {
    const { container } = render(
      <MySetting
        setting={{
          settingDesc: "Test description",
          type: ComponentType.ButtonGroup,
          props: { variant: 'contained' },
          children: [
            { key: '1', value: '1' },
            { key: '2', value: '2' }
          ],
        }}
      />
    );

    const childButtons = container.querySelectorAll('button');
    expect(childButtons.length).toBe(2);
    expect(childButtons[0].textContent).toBe('1');
    expect(childButtons[1].textContent).toBe('2');
  });

  test('renders Select component with MenuItem children', async () => {
    render(
      <MySetting
        setting={{
          settingDesc: "Test description",
          type: ComponentType.Select,
          props: { value: 'option1', onChange: () => { } },
          children: [
            { key: 'option1', value: 'option1', text: 'option1' },
            { key: 'option2', value: 'option2', text: 'option2' }
          ],
        }}
      />
    );

    // Find the select element using the role 'combobox'
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeTruthy();

    // Click the select element to open the dropdown
    await act(async () => {
      fireEvent.mouseDown(selectElement);
    });

    // Find the options (listbox children)
    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeTruthy();

    // Get all the options in the listbox
    const optionElements = within(listbox).getAllByRole('option');
    expect(optionElements.length).toBe(2);
    expect(optionElements[0].textContent).toBe('option1');
    expect(optionElements[1].textContent).toBe('option2');
  });

  test('renders FloatingActionButton component with children', async () => {
    render(
      <MySetting
        setting={{
          settingDesc: "Test description",
          type: ComponentType.FloatingActionButton,
          props: { color: 'primary' },
          children: 'FAB',
        }}
      />
    );

    const fabButton = screen.getByText('FAB');
    expect(fabButton).toBeTruthy();
    expect(fabButton.textContent).toBe('FAB');
  });

  test('renders RadioGroup component with children', async () => {
    render(
      <MySetting
        setting={{
          settingDesc: "Test description",
          type: ComponentType.RadioGroup,
          props: { name: 'radio-group' },
          children: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' }
          ],
        }}
      />
    );

    // Find the radio group using the role attribute
    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toBeTruthy();

    // Find all labels within the radio group
    const labels = radioGroup.querySelectorAll('label.MuiFormControlLabel-root');
    expect(labels.length).toBe(2);

    // Check the first radio button
    const firstLabel = labels[0];
    const firstRadioInput = firstLabel.querySelector('input');
    expect(firstRadioInput).toBeTruthy();
    expect(firstRadioInput?.getAttribute('value')).toBe('option1');
    expect(firstLabel.textContent).toBe('Option 1');

    // Check the second radio button
    const secondLabel = labels[1];
    const secondRadioInput = secondLabel.querySelector('input');
    expect(secondRadioInput).toBeTruthy();
    expect(secondRadioInput?.getAttribute('value')).toBe('option2');
    expect(secondLabel.textContent).toBe('Option 2');
  });

  test('reacts to prop changes', async () => {
    const { rerender } = render(
      <MySetting
        setting={{
          settingDesc: "Test description",
          type: ComponentType.Button,
          props: { 'data-testid': 'test-button', disabled: true },
          children:"clickme"
        }}
      />
    );

    const button = screen.getByTestId('test-button');
    expect(button).toHaveProperty('disabled', true);

    rerender(
      <MySetting
        setting={{
          settingDesc: "Test description",
          type: ComponentType.Button,
          props: { 'data-testid': 'test-button', disabled: false },
          children:"clickme"
        }}
      />
    );
    expect(button).toHaveProperty('disabled', false);
  });

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

    await act(async () => {
      await userEvent.click(button);
    });

    expect(handleClick).toHaveBeenCalled();
  });


});
