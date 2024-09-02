import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import Store from './Redux/store';
import theme from './Theme';
import Client from './components/client/Client';
import MainRouter from './components/router/MainRouter';
import React, { Suspense, useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useAppSelector } from './Redux/hooks';
import ErrorToast from './components/generic/errorMassage';
import Login from './components/Login/login';
import Header from './components/Header/Header';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher';

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

const App = () => {
  const { t } = useTranslation();

  const currentUser = useAppSelector((state) => state.currentUserSlice);
  const [typeUser, setTypeUser] = useState<string | null>(null);
  //currentUser-עובדים עליו עכשיו ויצטרכו לשנות אחרי כן
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      const type = currentUser.employeeDetails.role.type;
      setTypeUser(type);
    }
  }, [currentUser]);

  const isRootPath = location.pathname === '/';

  return (
    <ThemeProvider theme={theme}>
      <Provider store={Store}>
        <Header />
        <LanguageSwitcher />
        <Header />
        <Client />
        <ErrorToast />
        <Routes>
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
          <Route path='/allorders/:businessCode?' element={<MainRouter />} />
          <Route path='/allinventory/*' element={<MainRouter />} />
          <Route
            path='/link/:linkUID'
            element={
              <Suspense fallback='Loading...'>
                {' '}
                <LazyClient />{' '}
              </Suspense>
            }
          >
            <Route path='orders' element={<MainRouter />} />
            <Route path='inventory' element={<MainRouter />} />
            <Route path='HomePage' element={<MainRouter />} />
            <Route path='Setting/Category' element={<MainRouter />} />
            <Route path='Worker/*' element={<MainRouter />} />
          </Route>
        </Routes>

        {isRootPath && (
          <>
            {typeUser !== 'admin' &&
            typeUser !== '' &&
            typeUser !== undefined &&
            typeUser !== null ? (
              <Client />
            ) : typeUser === 'admin' ? (
              <>
                <MainRouter />
                <Link to={'/CreateBusiness/BaseDetailsManager'}>
                  הרשמה של עסק
                </Link>
              </>
            ) : (
              <Login/>
            )}
          </>
        )}
      </Provider>
    </ThemeProvider>
  );
};

export default App;
