import React from 'react';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals'; 
import { render, screen, fireEvent } from '@testing-library/react';
import TextField from './TextField';

test('renders TextField component without crashing', () => {
  render(<TextField id="test-id" variant="outlined" label="Test Label" value="" onChange={() => {}} disabled={false} margin="normal" InputProps={{}} sx={{}} />);
});

test('renders TextField component and checks if it is displayed with its label', () => {
  render(<TextField id="test-id" variant="outlined" label="Test Label" value="" onChange={() => {}} disabled={false} margin="normal" InputProps={{}} sx={{}} />);
  const textFieldElement = screen.getByLabelText('Test Label');
  expect(textFieldElement).toBeInTheDocument();
});

test('verifies that events are activated on TextField component', () => {
  const mockOnChange = jest.fn();
  render(<TextField id="test-id" variant="outlined" label="Test Label" value="" onChange={mockOnChange} disabled={false} margin="normal" InputProps={{}} sx={{}} />);
  const textFieldElement = screen.getByLabelText('Test Label');
  textFieldElement.focus();
  fireEvent.change(textFieldElement, { target: { value: 'Test Value' } });
  expect(mockOnChange).toHaveBeenCalledTimes(1);
});
