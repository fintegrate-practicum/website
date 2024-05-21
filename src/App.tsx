import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import { Store } from './Redux/Store';
import theme from './Theme';
import BaseDetailsManager from './components/createBusiness/baseDetailsManager'


function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          <div>
          <BaseDetailsManager/>
          </div>
        </Provider>
      </ThemeProvider>
    </>
  )
}
export default App
