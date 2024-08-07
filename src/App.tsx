import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import Store from './Redux/store';
import theme from './Theme';
import AuthMenu from './auth0/AuthMenu';
import Client from './components/client/Client';
import MainRouter from './components/router/MainRouter';
import React, { Suspense, useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import BaseDetailsManager from './components/createBusiness/baseDetailsManager';
import EmailVerification from './components/createBusiness/emailVerification';
import MoreDetailsManager from './components/createBusiness/moreDetailsManager';
import { useAppSelector } from './Redux/hooks';
import ErrorToast, { showErrorToast } from './components/generic/errorMassage';

const LazyBaseDetailsManager = React.lazy(() => import('./components/createBusiness/baseDetailsManager'));
const LazyEmailVerification = React.lazy(() => import('./components/createBusiness/emailVerification'));
const LazyMoreDetailsManager = React.lazy(() => import('./components/createBusiness/moreDetailsManager'));
const LazyClient = React.lazy(() => import('./components/client/Client'));
const LazyEditProfile = React.lazy(() => import('./auth0/editProfile'));

const App = () => {

  const currentUser = useAppSelector((state) => state.currentUserSlice.CurrentUser);
  const [typeUser, setTypeUser] = useState<any | null>(null);
  const [lastInvalidPath, setLastInvalidPath] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      const type = currentUser.employeeDetails.role.type;
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

        <AuthMenu />
        <ErrorToast />
        <Routes>
          {/* <Route path="/link/:linkUID" element={<Client />} > </Route> */}
          <Route path="/HomePage" element={<MainRouter />} />
          <Route path="/manager/*" element={<MainRouter />} />
          <Route path="/Setting/Category" element={<MainRouter />} />
          <Route path="/Worker/*" element={<MainRouter />} />
          <Route path="/orders" element={<MainRouter />} />
          <Route path="/inventory/*" element={<MainRouter />} />
          <Route path="/editProfile" element={<Suspense fallback="Loading..."><LazyEditProfile /></Suspense>} />
          <Route path="/CreateBusiness/BaseDetailsManager" element={<BaseDetailsManager />} />
          <Route path="/CreateBusiness/EmailVerification" element={<EmailVerification />} />
          <Route path="/CreateBusiness/MoreDetailsManager" element={<MoreDetailsManager />} />
          <Route path="/:any/*" element={<ErrorToastRoute />} />
          <Route path="/link/:linkUID" element={<Client />} />
        </Routes>
        {isRootPath && (
          <>
            {typeUser !== 'admin' && typeUser !== '' && typeUser !== undefined && typeUser !== null ? (
              <Client />
            ) : typeUser === 'admin' ? (
              <>
                <MainRouter />
                <Link to={'/CreateBusiness/BaseDetailsManager'}>הרשמה של עסק</Link>
              </>
            ) : (
                <Login/>
            )}
          </>

        )}
      </Provider>
    </ThemeProvider>
  );
}

export default App;


