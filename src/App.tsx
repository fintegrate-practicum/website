import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import { Store } from './Redux/Store';
import theme from './Theme';


function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          <div>
          </div>
        </Provider>
      </ThemeProvider>
    </>
  )
}
export default App
