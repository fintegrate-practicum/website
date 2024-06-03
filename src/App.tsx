import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import { Store } from './Redux/Store';
import theme from './Theme';
import { useState } from 'react';
import menuItem from '../src/components/menu/types';
import LazyRouter from './components/router/lazyRouter';
import AuthMenu from './auth0/AuthMenu';

function App() {

  const [currentMenu, setCurrentMenu] = useState<menuItem>();

  return (
    <>
    <AuthMenu />
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          <div></div>
          <LazyRouter currentRoute={currentMenu?.route || ' '} />
          <div>Hello</div>
        </Provider>
      </ThemeProvider>
    </>
  )
}
export default App
