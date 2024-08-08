// import  jest  from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TextField from './TextField';
test('renders TextField component without crashing', () => {
	render(<TextField />);
});
test('renders TextField component and checks if it is displayed with its label', () => {
	render(<TextField label='Test Label' />);
	const textFieldElement = screen.getByLabelText('Test Label');
	expect(textFieldElement).toBeInTheDocument();
});
