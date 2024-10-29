import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
   const [counter, setCounter] =  useState(25)
 // let counter =  25

  const addValue = () => {
   console.log("clicled", counter);
   //counter = counter + 1
   setCounter (counter + 1)
  }

  const removeValue = () => {
    setCounter(counter - 1)
  }
  return (
    <>
      <h1> Jai Shree Ram </h1>
      <h2>counter value: {counter }</h2>
      <button
       onClick={addValue}
      >add value</button>
      <br />
      <button
      onClick={removeValue}>remove value </button>
      <p>footer:{counter}</p>
    </>
  )
}

export default App
