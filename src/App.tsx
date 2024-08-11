import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import Store from './Redux/store';
import theme from './Theme';
import Client from './components/client/Client';
import MainRouter from './components/router/MainRouter';
import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAppSelector } from './Redux/hooks';
import ErrorToast, { showErrorToast } from './components/generic/errorMassage';
import Inventory from './modules/inventory/Inventory';
import Login from './components/Login/login';
import Header from './components/Header/Header';
import {useTranslation} from 'react-i18next'
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';

const LazyEditProfile = React.lazy(() => import('./auth0/editProfile'));
const LazyBaseDetailsManager = React.lazy(() => import('./components/createBusiness/baseDetailsManager'));
const LazyEmailVerification = React.lazy(() => import('./components/createBusiness/emailVerification'));
const LazyMoreDetailsManager = React.lazy(() => import('./components/createBusiness/moreDetailsManager'));
const LazyClient = React.lazy(() => import('./components/client/Client'));



const App = () => {
  const { t } = useTranslation();
  const currentUser = useAppSelector((state) => state.currentUserSlice.CurrentUser);
  const [typeUser, setTypeUser] = useState<any | null>(null);
  const [lastInvalidPath, setLastInvalidPath] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      const type = currentUser.employeeDetails.role.type
      setTypeUser(type);
    }
  }, [currentUser]);

  const ErrorToastRoute = () => {

    useEffect(() => {
      if (location.pathname !== lastInvalidPath) {
        showErrorToast('הדף שאת/ה מחפש/ת אינו נמצא route-הכנס/י ב http://localhost:0000/link/**של עסק linkUID**');
        setLastInvalidPath(location.pathname);
      }
    }, [location, lastInvalidPath]);
    return null;
  };

  const isRootPath = location.pathname === '/';

  return (
    <ThemeProvider theme={theme}>
      <Provider store={Store}>
        <Header />
        <LanguageSwitcher />
        <Client />
        <ErrorToast />
        <Routes>
          <Route path="/inventory/*" element={<Inventory />} />
          <Route path="/editProfile" element={<Suspense fallback={t('common.Loading...')}><LazyEditProfile /></Suspense>} />
          <Route path="/CreateBusiness/BaseDetailsManager" element={<Suspense fallback={t('common.Loading...')}><LazyBaseDetailsManager /></Suspense>} />
          <Route path="/CreateBusiness/EmailVerification" element={<Suspense fallback={t('common.Loading...')}><LazyEmailVerification /></Suspense>} />
          <Route path="/CreateBusiness/MoreDetailsManager" element={<Suspense fallback={t('common.Loading...')}><LazyMoreDetailsManager /></Suspense>} />
          <Route path="/link/:linkUID" element={<Suspense fallback={t('common.Loading...')}><LazyClient /></Suspense>} />
        </Routes>
        {isRootPath && (
          <>
            {typeUser !== 'manager' && typeUser !== 'admin' && typeUser !== '' && typeUser !== undefined && typeUser !== null ? (
              <Client />
            ) : typeUser === 'manager' || typeUser === 'admin' ? (
              <>
                <MainRouter />
              </>
            ) : (
              <Login />
            )}
          </>
        )}
      </Provider>
    </ThemeProvider>
  );
}
export default App;