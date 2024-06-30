import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import Store from './Redux/store';
import theme from './Theme';
import React, { Suspense, useEffect, useState } from 'react';
import { Home, Settings } from '@mui/icons-material';
import SideMenu from './components/menu/SideMenu';
import Header from './components/Header/Header';
import { Link, Route, Routes } from 'react-router-dom';
import BaseDetailsManager from './components/createBusiness/baseDetailsManager';
import EmailVerification from './components/createBusiness/emailVerification';
import MoreDetailsManager from './components/createBusiness/moreDetailsManager';
import Client from './components/client/Client';
import { useAppSelector } from './Redux/hooks';
import AuthMenu from './auth0/AuthMenu';
import LazyRouter from './components/router/lazyRouter';
import menuItem from '../src/components/menu/types';
import ErrorToast from './components/generic/errorMassage';

const LazyEditProfile = React.lazy(() => import('./auth0/editProfile'));

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

const App = () => {
  const currentUser = useAppSelector((state) => state.currentUserSlice.CurrentUser);
  const [typeUser, setTypeUser] = useState<any | null>(null);
  const [currentMenu, setCurrentMenu] = useState<menuItem>(menuItems[0]);

  useEffect(() => {
    if (currentUser) {
      const type = currentUser.employeeDetails.role.type;
      setTypeUser(type);
    }
  }, [currentUser]);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={Store}>
        <AuthMenu />
        <ErrorToast/>
        <Routes>
          <Route path="/editProfile" element={<Suspense fallback="Loading..."><LazyEditProfile /></Suspense>} />
          <Route path="/CreateBusiness/BaseDetailsManager" element={<BaseDetailsManager />} />
          <Route path="/CreateBusiness/EmailVerification" element={<EmailVerification />} />
          <Route path="/CreateBusiness/MoreDetailsManager" element={<MoreDetailsManager />} />
        </Routes>
        {typeUser !== 'manager' && typeUser !== 'admin' && typeUser !== '' && typeUser !== undefined && typeUser !== null ? (
          <Client/>
        ) : typeUser === 'manager' || typeUser === 'admin' ? (
          <>
            <Header serviceName={currentMenu?.nameToView}><div></div></Header>
            <SideMenu items={menuItems} setCurrentMenu={setCurrentMenu} />
            <LazyRouter currentRoute={currentMenu?.route || ' '} />
          </>
        ) : (
          <Link to={'/CreateBusiness/BaseDetailsManager'}>הרשמה של עסק</Link>
        )}
      </Provider>
    </ThemeProvider>
  );
}

export default App;

