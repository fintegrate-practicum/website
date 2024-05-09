import { ThemeProvider } from '@mui/material/styles';
// import { Provider } from 'react-redux';
import './App.css';
// import { store } from './Redux/Store';
import theme from './Theme';

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Provider store={store}> */}
        {/* </Provider> */}
        <p>fffffffffffff</p>
      </ThemeProvider>
    </>
  )
}

export default App
