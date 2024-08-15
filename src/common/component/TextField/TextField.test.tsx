import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TextField from './TextField';
import { vitest } from 'vitest';
test('renders TextField component without crashing', () => {
  render(<TextField />);
});
test('renders TextField component and checks if it is displayed with its label', () => {
  render(<TextField label='Test Label' />);
  const textFieldElement = screen.getByLabelText('Test Label');
  expect(textFieldElement).toBeInTheDocument();
});
test('onChange function is called when input value is changed', () => {
  const mockOnChange = vitest.fn();
  render(<TextField label='Test Label' onChange={mockOnChange} />);
  const textFieldElement = screen.getByLabelText('Test Label');
  fireEvent.change(textFieldElement, { target: { value: 'Test Value' } });
  expect(mockOnChange).toHaveBeenCalled();
});
