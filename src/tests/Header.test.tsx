import { describe, test, expect, vi } from 'vitest';
import Header from "../components/Header/Header";

import { render, screen } from '@testing-library/react';


describe('<Header>', () => {
  interface HeaderProps {
    serviceName: string; 
  }

  const defaultProps: HeaderProps = {
    serviceName: 'Test Service'
  };

  test('renders header with provided service name', () => {
    render(<Header {...defaultProps} />);
    const serviceNameElement = screen.getByText(defaultProps.serviceName);
    expect(serviceNameElement).toBeDefined();
  });

  test('renders header with default service name when no prop is provided', () => {
    render(<Header />);
    const defaultServiceNameElement = screen.getByText(/Send service name in props/i);
    expect(defaultServiceNameElement).toBeDefined();
  });

  test('renders header with logo', () => {
    render(<Header {...defaultProps} />);
    const logoElement = screen.getByAltText('Logo');
    expect(logoElement).toBeDefined();
  });

  test('renders ContactMailIcon', () => {
    render(<Header {...defaultProps} />);
    const contactMailIconElement = screen.getByLabelText('Contact Mail');
    expect(contactMailIconElement).toBeDefined();
  });

  test('renders SettingsIcon', () => {
    render(<Header {...defaultProps} />);
    const settingsIconElement = screen.getByLabelText('Settings');
    expect(settingsIconElement).toBeDefined();
  });

  //עדין הכפתורים לא עובדים

  // test('handles click event on ContactMailIcon', async () => {
  //   const handleClick = vi.fn();
  //   render(<Header {...defaultProps} />);
  //   const contactMailIconElement = screen.getByLabelText('Contact Mail');
  //   await userEvent.click(contactMailIconElement);
  //   expect(handleClick).toHaveBeenCalled();
  // });

  // test('handles click event on SettingsIcon', async () => {
  //   const handleClick = vi.fn();
  //   render(<Header {...defaultProps} />);
  //   const settingsIconElement = screen.getByLabelText('Settings');
  //   await userEvent.click(settingsIconElement);
  //   expect(handleClick).toHaveBeenCalled();
  // });

  
});
