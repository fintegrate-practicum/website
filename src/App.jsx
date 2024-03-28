import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import theme from './Theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
      </ThemeProvider>
    </>
  )
}

export default App
