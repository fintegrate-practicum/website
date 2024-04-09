import Button from '../Button'
import './App.css'

function App() {
  const click =() =>{
    alert("שנה לפונקציה הרצויה לך!!!");
  }
  
  return (
    <>
      <Button  value="button" onClickFunction={click}/>
    </>
  )
}

export default App
