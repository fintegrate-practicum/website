import { describe, test } from 'vitest';
import { render } from '@testing-library/react';
import Inventory from './Inventory';
import { BrowserRouter } from 'react-router-dom';
const r = render;
console.log(r);

describe('<App/>', () => {
  test('App mounts properly', () => {
    <BrowserRouter>
      render(
      <Inventory />)
    </BrowserRouter>;
  });
});
