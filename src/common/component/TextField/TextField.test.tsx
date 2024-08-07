// import  jest  from '@jest/globals'; 
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TextField from './TextField';

test('renders TextField component without crashing', () => {
  render(<TextField />);
});

test('renders TextField component and checks if it is displayed with its label', () => {
  render(<TextField />);
  const textFieldElement = screen.getByLabelText('Test Label');
  expect(textFieldElement).toBeInTheDocument();
});

test('verifies that events are activated on TextField component', () => {
  const mockOnChange = jest.fn();
  render(<TextField />);
  const textFieldElement = screen.getByLabelText('Test Label');
  textFieldElement.focus();
  fireEvent.change(textFieldElement, { target: { value: 'Test Value' } });
  expect(mockOnChange).toHaveBeenCalledTimes(1);
});
