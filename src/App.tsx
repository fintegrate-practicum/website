import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import { Store } from './Redux/Store';
import theme from './Theme';
import { useState } from 'react';
import menuItem from '../src/components/menu/types';
import LazyRouter from './components/router/lazyRouter';
import AuthMenu from './auth0/AuthMenu';
import Navbar from './components/moduls/order/MuiNavbar/MuiNavbar';
import * as React from 'react';

function App() {

  const [currentMenu, setCurrentMenu] = useState<menuItem>();
  return (
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          <AuthMenu />
          <Navbar />
          <LazyRouter currentRoute={currentMenu?.route || ' '} />
        </Provider>
      </ThemeProvider>
  )
}


export default App
