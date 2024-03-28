import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { store } from './Redux/Store'
import { Provider } from 'react-redux';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/profile';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const [count, setCount] = useState(0)

  const {isLoading}= useAuth0();
  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <Provider store={store}>

      <LoginButton/>
      <LogoutButton/>
      <Profile/>
      
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
      
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      </Provider>
    </>
  )
}

export default App
