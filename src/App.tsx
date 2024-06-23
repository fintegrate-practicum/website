import { ThemeProvider } from '@mui/material/styles';
import { Provider, useDispatch, useSelector } from 'react-redux';
import './App.css';
import  Store  from './Redux/Store';
import theme from './Theme';
import { useEffect, useState } from 'react';
import menuItem from '../src/components/menu/types';
import LazyRouter from './components/router/lazyRouter';
import AuthMenu from './auth0/AuthMenu';
import { Home, Settings } from '@mui/icons-material';
import SideMenu from './components/menu/SideMenu';
import Header from './components/Header/Header';
import BaseDetailsManager from './components/createBusiness/baseDetailsManager';
import Button from '../Button'
import { Jwt, useAppDispatch } from './Redux/hooks'
import { getBusinessData } from './Redux/businessSlice';
import { log } from 'console';

import Aaa from './Aaa'





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
  const click = () => {
    alert("שנה לפונקציה הרצויה לך!!!");
  }
  const token = Jwt('accessToken');
  console.log('Token:', token);
//   const dispatch = useAppDispatch();
//  const aaa= dispatch(getBusinessData());
//  console.log(aaa);
 
  // useEffect(() => {
  //   dispatch(getBusinessData());
  // }, [dispatch]);

  // שלוף את הנתונים או סטטוס הטעינה מה-state
  //  const businessData = useSelector(state => state.yourSlice.businessData); // החלף בנתיב הנכון ל-state שלך
  //  const loading = useSelector(state => state.yourSlice.loading);
  //  const error = useSelector(state => state.yourSlice.error);
  // const dispatch = useAppDispatch()
  // const businessData = useSelector((state) => state);
  // console.log(businessData);
  // dispatch(getBusinessData());


  // useEffect(() => {
  //   const data=dispatch(getBusinessData())
  //   console.log(data);  }, 
  //   [dispatch]);



  return (
    <>
      {/* <AuthMenu />
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          <Header serviceName={currentMenu?.nameToView}><div></div></Header>
          <div></div>
          <SideMenu items={menuItems} setCurrentMenu={setCurrentMenu} />
          <LazyRouter currentRoute={currentMenu?.route || ' '} />
        </Provider>
      </ThemeProvider> */}

      <ThemeProvider theme={theme}>
        <Provider store={Store}>

          <AuthMenu />
          <div><BaseDetailsManager /></div>
          {/* <Button value="button" onClickFunction={dispatch(getBusinessData()) }/> */}
          {/* <LazyRouter currentRoute={currentMenu?.route || ' '} /> */}
          <Aaa/>
          <div>Hello</div>
          <Button value="button" onClickFunction={click} />
        </Provider>
      </ThemeProvider>
    </>
  )
}
export default App