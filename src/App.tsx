import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Provider } from 'react-redux';
import './App.css';
import Store from './Redux/store'
import theme from './Theme';
import { useEffect, useState } from 'react';
import menuItem from '../src/components/menu/types';
import LazyRouter from './components/router/lazyRouter';
import AuthMenu from './auth0/AuthMenu';
import { Home, Settings } from '@mui/icons-material';
import SideMenu from './components/menu/SideMenu';
import Header from './components/Header/Header';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import BaseDetailsManager from './components/createBusiness/baseDetailsManager';
import EmailVerification from './components/createBusiness/emailVerification';
import MoreDetailsManager from './components/createBusiness/moreDetailsManager';
import Client from './components/client/Client';

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

function LinkUIDRoute({ element: Element }: { element: React.ComponentType }) {
  const { linkUID } = useParams<{ linkUID: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!linkUID) {
      navigate('/');
    }
  }, [linkUID, navigate]);

  return <Element />;
}

function App() {
  const [currentMenu, setCurrentMenu] = useState<menuItem>(menuItems[0]);

  return (
    <>
      <AuthMenu />
      <ThemeProvider theme={theme}>
        <Provider store={Store}>

          <Link to={'/CreateBusiness/BaseDetailsManager'}>הרשמה של עסק</Link>

          <Routes>
            <Route path="/CreateBusiness/BaseDetailsManager" element={<BaseDetailsManager />} />
            <Route path="/CreateBusiness/EmailVerification" element={<EmailVerification />} />
            <Route path="/CreateBusiness/MoreDetailsManager" element={<MoreDetailsManager />} />
            <Route path="/link/:linkUID" element={<LinkUIDRoute element={Client} />} />
            <Route path="*" element={
              <>
                <Typography>של הדפדפן route-הכנס ב</Typography>
                <Typography>http://localhost:0000/link/**של עסק linkUID**</Typography>
              </>
            } />
            <Route path="/" element={
              <>
                <Header serviceName={currentMenu?.nameToView}><div></div></Header>
                <SideMenu items={menuItems} setCurrentMenu={setCurrentMenu} />
                <LazyRouter currentRoute={currentMenu?.route || ' '} />
              </>
            } />
          </Routes>

        </Provider>
      </ThemeProvider>
    </>
  )
}
export default App