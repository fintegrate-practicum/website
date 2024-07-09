import {describe,test } from 'vitest';
import { render } from '@testing-library/react';
import Notification from './Notification';


describe('<Notification/>',()=>{
    test('Notification mounts properly', () => {
       render(<Notification messege='notification for example' vertical='top' horizontal='center'/>)
      })
    })