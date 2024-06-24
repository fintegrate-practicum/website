import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import { Store } from './Redux/Store';
import theme from './Theme';
import { useState } from 'react';
import menuItem from '../src/components/menu/types';
import LazyRouter from './components/router/lazyRouter';
import AuthMenu from './auth0/AuthMenu';
import { Home, Settings } from '@mui/icons-material';
import SideMenu from './components/menu/SideMenu';
import Header from './components/Header/Header';
import { Link, Route, Routes } from 'react-router-dom';
import BaseDetailsManager from './components/createBusiness/baseDetailsManager';
import EmailVerification from './components/createBusiness/emailVerification';
import MoreDetailsManager from './components/createBusiness/moreDetailsManager';

const menuItems = [
  {
    name: 'homePage',
    nameToView: 'HomePage',
    icon: Home,
    route: '../HomePage/homePage',
  },
  {
    name: 'settings',
    nameToView: 'Settings',
    icon: Settings,
    route: '../Setting/Category',
  },

];


function App() {


  const [currentMenu, setCurrentMenu] = useState<menuItem>(menuItems[0]);

  return (
    <>
      <AuthMenu />
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          <Header serviceName={currentMenu?.nameToView}><div></div></Header>
          <div></div>
          <SideMenu items={menuItems} setCurrentMenu={setCurrentMenu} />

          <LazyRouter currentRoute={currentMenu?.route || ' '} />
          <Link to={'/CreateBusiness/BaseDetailsManager'}>הרשמה של עסק</Link>
          <Routes>
            <Route path="/CreateBusiness/BaseDetailsManager" element={<BaseDetailsManager />} />
            <Route path="/CreateBusiness/EmailVerification/:companyNumber/:email" element={<EmailVerification />} />
            <Route path="/CreateBusiness/MoreDetailsManager/:companyNumber" element={<MoreDetailsManager />} />
          </Routes>

        </Provider>
      </ThemeProvider>
    </>
  )
}
export default App