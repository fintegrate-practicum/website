import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import Store from './Redux/store';
import theme from './Theme';
import Client from './components/client/Client';
import MainRouter from './components/router/MainRouter';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAppSelector } from './Redux/hooks';
import ErrorToast from './components/generic/errorMassage';
import Inventory from './modules/inventory/Inventory';
import Login from './components/Login/login';
import Header from './components/Header/Header';
import Orders from './modules/orders/App';
import AllOrders from './modules/orders/allOrders';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';
import { getTextDirection } from './utils/utils';

const LazyEditProfile = React.lazy(() => import('./auth0/editProfile'));
const LazyBaseDetailsManager = React.lazy(
  () => import('./components/createBusiness/baseDetailsManager'),
);
const LazyEmailVerification = React.lazy(
  () => import('./components/createBusiness/emailVerification'),
);
const LazyMoreDetailsManager = React.lazy(
  () => import('./components/createBusiness/moreDetailsManager'),
);
const LazyClient = React.lazy(() => import('./components/client/Client'));
const LazyClientsList = React.lazy(
  () => import('./modules/clients/ClientsList'),
);
const App = () => {
  const { t, i18n } = useTranslation();
  const direction = getTextDirection(i18n.language);

  const currentUser = useAppSelector((state) => state.currentUserSlice);
  const [typeUser, setTypeUser] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      const type = currentUser.employeeDetails.role.type;
      setTypeUser(type);
    }
  }, [currentUser]);

  const isRootPath = location.pathname === '/';
  const memoizedTheme = useMemo(() => theme(direction), [direction]);
  return (
    <ThemeProvider theme={memoizedTheme}>
      <Provider store={Store}>
        <Header />
        <LanguageSwitcher />
        <Client />
        <ErrorToast />
        <Routes>
          <Route
            path='/ClientList'
            element={
              <Suspense fallback={t('common.Loading...')}>
                <LazyClientsList />
              </Suspense>
            }
          />
          <Route path='/inventory/*' element={<Inventory />} />
          <Route path='/allOrders/:businessCode?' element={<AllOrders />} />
          <Route
            path='/editProfile'
            element={
              <Suspense fallback={t('common.Loading...')}>
                <LazyEditProfile />
              </Suspense>
            }
          />
          <Route
            path='/CreateBusiness/BaseDetailsManager'
            element={
              <Suspense fallback={t('common.Loading...')}>
                <LazyBaseDetailsManager />
              </Suspense>
            }
          />
          <Route
            path='/CreateBusiness/EmailVerification'
            element={
              <Suspense fallback={t('common.Loading...')}>
                <LazyEmailVerification />
              </Suspense>
            }
          />
          <Route
            path='/CreateBusiness/MoreDetailsManager'
            element={
              <Suspense fallback={t('common.Loading...')}>
                <LazyMoreDetailsManager />
              </Suspense>
            }
          />
          <Route
            path='/link/:linkUID'
            element={
              <Suspense fallback={t('common.Loading...')}>
                <LazyClient />
              </Suspense>
            }
          >
            <Route path='orders' element={<Orders />} />
          </Route>
        </Routes>

        {isRootPath && (
          <>
            {typeUser !== 'manager' &&
            typeUser !== 'admin' &&
            typeUser !== '' &&
            typeUser !== undefined &&
            typeUser !== null ? (
              <Client />
            ) : typeUser === 'manager' || typeUser === 'admin' ? (
              <MainRouter />
            ) : (
              <Login />
            )}
          </>
        )}
      </Provider>
    </ThemeProvider>
  );
};

export default App;
