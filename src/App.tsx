import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import { Store } from './Redux/Store';
import theme from './Theme';
import { useState } from 'react';
import menuItem from '../src/components/menu/types';
import LazyRouter from './components/router/lazyRouter';
import AuthMenu from './auth0/AuthMenu';
import * as iconsMaterial from '@mui/icons-material';
import SideMenu from './components/menu/SideMenu';
import Navbar from './components/moduls/order/navBar/MuiNavbar';
const menuItems = [
  
  {
    name: 'settings',
    nameToView: 'Settings',
    icon: iconsMaterial.Settings,
    route: '../Setting/Category',
  },
  {
    name: 'Header',
    nameToView: 'Header',
    icon: iconsMaterial.Person,
    route: '../Header/Header',
  },
];
function App() {
  const [currentMenu, setCurrentMenu] = useState<menuItem>(menuItems[1]);
  return (
    <>
    <AuthMenu />
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          <div></div>
          <SideMenu items={menuItems} setCurrentMenu={setCurrentMenu} />
          <LazyRouter currentRoute={currentMenu?.route || ' '} />
       
        </Provider>
      </ThemeProvider>
    </>
  )
}
export default App