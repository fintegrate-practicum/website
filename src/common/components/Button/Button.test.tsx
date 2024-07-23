import { describe, test } from 'vitest';
import { render } from '@testing-library/react';
import Button from './Button';


describe('<Button/>', () => {
    test('full color Button ', () => {
        render(<Button
            onClick={() => console.log("succeed")}
            isLink={false}
            value="התחברות"
            backgroundColor="#6503A6"
            borderColor="#F2CB05"
            border="1px solid black"
            outlineColor="#F2B704"
            color="white"
        />)
    }),
        test('empty Button ', () => {
            render(<Button
                onClick={() => console.log("succeed")}
                isLink={false}
                value="התחברות"
                backgroundColor="white"
                borderColor="#F2CB05"
                border="1px solid black"
                outlineColor="#F2B704"
                color="white"
            />)
        }),
        test('empty Button ', () => {
            render(<Button
                href='https://www.example.com'
                isLink={true}
                value="התחברות"
                color="white"
            />)
        })
})