import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css'
import { Inventory } from '@mui/icons-material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <React.StrictMode>
  <BrowserRouter>
    <Inventory />
  </BrowserRouter>
  </React.StrictMode>
  </Provider>
);

