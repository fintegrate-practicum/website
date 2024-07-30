import { describe, test, expect } from 'vitest';
import { render,fireEvent } from '@testing-library/react';
import Button from './Button';

describe('<Button />', () => {
    test('renders full color Button', () => {
        const { getByText } = render(
            <Button 
            onClick={() => console.log("succeed")}
            isLink={false}
            color="primary"
            variant="contained">
                התחברות
            </Button>
        );

        const buttonElement = getByText('התחברות');
        expect(buttonElement).toBeInTheDocument();
    });

    test('renders empty Button', () => {
        const { getByText } = render(
            <Button
                onClick={() => console.log("succeed")}
                isLink={false}
                color="primary"
                variant="outlined"
            >התחברות</Button>
        );

        const buttonElement = getByText('התחברות');
        expect(buttonElement).toBeInTheDocument();
    });

    test('renders link Button', () => {
        const { getByText } = render(
            <Button
                href='https://www.example.com'
                isLink={true}
                color="primary"
            >התחברות</Button>
        );

        const buttonElement = getByText('התחברות');
        expect(buttonElement).toBeInTheDocument();
    });


    test('button click event', () => {
        const { getByText } = render(<Button children="התחברות"/>);
        const button = getByText('התחברות') 
        

        fireEvent.click(button);

    
    });
});