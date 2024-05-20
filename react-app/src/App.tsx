import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import { Store } from './Redux/Store';
import theme from './Theme';
import HomePage from './components/HomePage/HomePage';

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          <div>
            <HomePage/>
          </div>
        </Provider>
      </ThemeProvider>
    </>
  )
}
export default App
