import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideebarWorkerDetails from './componnents/sideebar-work-basic-details'
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import { store } from './Redux/Store';
import theme from './Theme';
 

function App() {
  return (
    <>
 sidebar-component
      <SideebarWorkerDetails/>
      <ThemeProvider theme={theme}>
        <Provider store={store}>

        </Provider>
      </ThemeProvider>
 
    </>
  )
}

export default App
