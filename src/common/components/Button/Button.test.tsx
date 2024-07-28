import { describe, test, expect } from 'vitest';
import { render,fireEvent } from '@testing-library/react';
import Button from './Button';

describe('<Button />', () => {
    test('renders full color Button', () => {
        const { getByText } = render(
            <Button
                onClick={() => console.log("succeed")}
                isLink={false}
                value="התחברות"
                color="primary"
            />
        );

        const buttonElement = getByText('התחברות');
        expect(buttonElement).toBeInTheDocument();
    });

    test('renders empty Button', () => {
        const { getByText } = render(
            <Button
                onClick={() => console.log("succeed")}
                isLink={false}
                value="התחברות"
                color="primary"
            />
        );

        const buttonElement = getByText('התחברות');
        expect(buttonElement).toBeInTheDocument();
    });

    test('renders link Button', () => {
        const { getByText } = render(
            <Button
                href='https://www.example.com'
                isLink={true}
                value="התחברות"
                color="primary"
            />
        );

        const buttonElement = getByText('התחברות');
        expect(buttonElement).toBeInTheDocument();
    });


    test('button click event', () => {
        const { getByText } = render(<Button />);
        const button = getByText('התחברות') 
        

        fireEvent.click(button);

    
    });
});