import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import Button from './Button';

describe('<Button />', () => {
    test('renders full color Button', () => {
        const { getByText } = render(
            <Button
                onClick={() => console.log("succeed")}
                isLink={false}
                value="התחברות"
                backgroundColor="#6503A6" 
                outlineColor="#F2B704" 
                color="white" 
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
                backgroundColor="white" 
                outlineColor="#F2B704" 
                color="white" 
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
                color="white" 
            />
        );

        const buttonElement = getByText('התחברות');
        expect(buttonElement).toBeInTheDocument();
    });
});