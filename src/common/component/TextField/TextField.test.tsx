import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextField from './TextField';

test('renders TextField component', () => {
  const handleChange = jest.fn();
  const { getByLabelText } = render(<TextField label="Name" value="" onChange={handleChange} />);

  const inputElement = getByLabelText('Name') as HTMLInputElement;
  expect(inputElement).toBeInTheDocument();
  expect(inputElement.value).toBe('');

  fireEvent.change(inputElement, { target: { value: 'John Doe' } });
  expect(handleChange).toHaveBeenCalledWith('John Doe');
});