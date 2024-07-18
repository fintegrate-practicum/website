import { describe,test} from 'vitest';
import {render} from '@testing-library/react';
import App from './Inventory';

describe('<App/>', () => {
    test('App mounts properly', () => {
         render(<App/>)
    })

})