import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MySetting, { ComponentType } from '../components/Setting/MySetting';
import Button from '@mui/material/Button';

describe('<MySetting>', () => {
  test.each(Object.values(ComponentType))(

    'renders the component for type %s',
    (type) => {
      const { container } = render(
        <MySetting
          setting={{
            settingDesc: "Test description",
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
        }}
      />
    );
    const button = screen.getByTestId('test-button');
    expect(button).not.toBeNull();
    expect(button).toHaveProperty('disabled', true);
  });

  

  

  test('renders component with children', () => {
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




  test('reacts to prop changes', async () => {
    const { rerender } = render(
      <MySetting
        setting={{
          settingDesc: "Test description",
          type: ComponentType.Button,
          props: { 'data-testid': 'test-button', disabled: true },
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
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});


