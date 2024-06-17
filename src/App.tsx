import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import { Store } from './Redux/Store';
import theme from './Theme';
import { useState } from 'react';
import menuItem from '../src/components/menu/types';
import LazyRouter from './components/router/lazyRouter';
import AuthMenu from './auth0/AuthMenu';
import Button from '../Button'
import BaseDetailsManager from './components/createBusiness/baseDetailsManager';

function App() {
  const click =() =>{
    alert("שנה לפונקציה הרצויה לך!!!");
  }

  const [currentMenu, setCurrentMenu] = useState<menuItem>();

  return (
    <>
    <AuthMenu />
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          <div><BaseDetailsManager/></div>
          {/* <LazyRouter currentRoute={currentMenu?.route || ' '} /> */}
          <div>Hello</div>
          <Button  value="button" onClickFunction={click}/>
        </Provider>
      </ThemeProvider>
    </>
  )
}
export default App
