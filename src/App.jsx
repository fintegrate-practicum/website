import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SideebarWorkerDetails from './componnents/sideebar-work-basic-details'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SideebarWorkerDetails/>
    </>
  )
}

export default App
