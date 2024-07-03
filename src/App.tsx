import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import Store from './Redux/store';
import theme from './Theme';
import { useEffect, useState } from 'react';
import menuItem from '../src/components/menu/types';
import LazyRouter from './components/router/lazyRouter';
import AuthMenu from './auth0/AuthMenu';
import { Business, Home, Link, Settings } from '@mui/icons-material';
import SideMenu from './components/menu/SideMenu';
import Header from './components/Header/Header';
import Client from './components/client/Client';
import ChooseEmail from './components/workers/chooseEmail';
import { Route, Routes } from 'react-router-dom';
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

enum UserType {
  Client,
  Admin
}

const getUserType = (): UserType => {
  // כאן נקבל את סוג המשתמש מה-auth0 או ממקור אחר
  return UserType.Client; // UserType.Client ללקוח, UserType.Admin למנהל
};

function App() {
  const [typeUser, setTypeUser] = useState<UserType | null>(null);
  const [currentMenu, setCurrentMenu] = useState<menuItem>(menuItems[0]);

  useEffect(() => {
    const type = getUserType();
    setTypeUser(type);
  }, []);

  if (typeUser === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AuthMenu />
      <ThemeProvider theme={theme}>
        <Provider store={Store}>

          {typeUser === UserType.Client ? (
            <Client />
          ) : (
            <>
              <Header serviceName={currentMenu?.nameToView}><div></div></Header>
              <div></div>
              <SideMenu items={menuItems} setCurrentMenu={setCurrentMenu} />
              <LazyRouter currentRoute={currentMenu?.route || ' '} />


            </>
          )}

        </Provider>
      </ThemeProvider>
    </>
  )
}
export default App