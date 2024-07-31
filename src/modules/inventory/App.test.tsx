import {describe, test} from 'vitest';
import {render} from '@testing-library/react';
import App from './Inventory';
import {BrowserRouter as Router} from 'react-router-dom';

describe('<App/>', () => {
    test('App mounts properly', () => {
        render(<Router><App/></Router>);
    })

})
