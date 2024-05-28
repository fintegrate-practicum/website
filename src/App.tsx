import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import { Store } from './Redux/Store';
import theme from './Theme';
import { useState } from 'react';
import menuItem from '../src/components/menu/types';
function App() {
const [currentMenu,setCurrentMenu]=useState<menuItem>();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          <div></div>
        </Provider>
      </ThemeProvider>
    </>
  )
}
export default App
