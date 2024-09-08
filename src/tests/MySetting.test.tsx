import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MySetting, { ComponentType } from '../components/Setting/MySetting';
import serviceSettingsSlice from '../Redux/serviceConfigurationsSlice'; 

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      serviceSettings: serviceSettingsSlice, 
    },
    preloadedState: initialState,
  });
};

const renderWithRedux = (component: any, initialState = {}) => {
  const store = createMockStore(initialState);
  return render(<Provider store={store}>{component}</Provider>);
};

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
      const { container } = renderWithRedux(
        <MySetting
          setting={{
            categoryName: 'TestCategory',
            serviceName: 'TestService',
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
    renderWithRedux(
      <MySetting
        setting={{
          categoryName: 'TestCategory',
          serviceName: 'TestService',
          settingDesc: 'Test description',
          type: ComponentType.Button,
          props: { 'data-testid': 'test-button', disabled: true },
          children: 'clickme',
        }}
      />
    );
    const button = screen.getByTestId('test-button');
    expect(button).not.toBeNull();
    expect(button).toHaveProperty('disabled', true);
  });

  test('renders null for invalid component type', () => {
    const { container } = renderWithRedux(
      <MySetting
        setting={{
          categoryName: 'TestCategory',
          serviceName: 'TestService',
          settingDesc: 'Test description',
          type: 'InvalidType' as ComponentType,
          props: {},
        }}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  test('renders component button with children', () => {
    renderWithRedux(
      <MySetting
        setting={{
          categoryName: 'TestCategory',
          serviceName: 'TestService',
          settingDesc: 'Test description',
          type: ComponentType.Button,
          props: {},
          children: 'Click me',
        }}
      />
    );
    const childElement = screen.getByText('Click me');
    expect(childElement).not.toBeNull();
  });

  test('reacts to prop changes', async () => {
    const store = createMockStore();

    const { rerender } = render(
      <Provider store={store}>
        <MySetting
          setting={{
            categoryName: 'TestCategory',
            serviceName: 'TestService',
            settingDesc: 'Test description',
            type: ComponentType.Button,
            props: { 'data-testid': 'test-button', disabled: true },
            children: 'clickme',
          }}
        />
      </Provider>
    );

    const button = screen.getByTestId('test-button');
    expect(button).toHaveProperty('disabled', true);

    rerender(
      <Provider store={store}>
        <MySetting
          setting={{
            categoryName: 'TestCategory',
            serviceName: 'TestService',
            settingDesc: 'Test description',
            type: ComponentType.Button,
            props: { 'data-testid': 'test-button', disabled: false },
            children: 'clickme',
          }}
        />
      </Provider>
    );

    expect(button).toHaveProperty('disabled', false);
  });

  test('handles user interaction', async () => {
    const handleClick = vi.fn();
    renderWithRedux(
      <MySetting
        setting={{
          categoryName: 'TestCategory',
          serviceName: 'TestService',
          settingDesc: 'Test description',
          type: ComponentType.Button,
          props: { 'data-testid': 'test-button', onClick: handleClick },
          children: 'Click me',
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



