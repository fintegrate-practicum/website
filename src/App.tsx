import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import Store from './Redux/store';
import theme from './Theme';
import { useEffect, useState } from 'react';
import AuthMenu from './auth0/AuthMenu';
import Client from './components/client/Client';
import MainRouter from './components/router/MainRouter';

enum UserType {
  Client,
  Admin
}

const getUserType = (): UserType => {
  // כאן נקבל את סוג המשתמש מה-auth0 או ממקור אחר
  return UserType.Client; // UserType.Client ללקוח, UserType.Admin למנהל
};

function App() {
  const [typeUser, setTypeUser] = useState<UserType | null>(null);

  useEffect(() => {
    const type = getUserType();
    setTypeUser(type);
  }, []);

  if (typeUser === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AuthMenu />
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          {typeUser === UserType.Client ? (
            <Client />
          ) : (
            <>
              <MainRouter/>
            </>
          )}
        </Provider>
      </ThemeProvider>
    </>
  )
}
export default App