import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState("DodgerBlue")
  return (
    <div id="container" className="w-screen h-screen flex flex-col justify-around items-center"
    style={{backgroundColor:color}}
    >
      <h1 className='text-4xl font-serif italic' style={{color:(color.charAt(1)>="E"?"black":"white")}}>This is a sample text</h1>

      <div className='flex items-center space-x-2 my-4'>
        
        <h1 className='text-2xl font-bold' style={{color:(color.charAt(1)>="E"?"black":"white")}}>Select Color : </h1>

        <input type="color" id="clr" value={color} onChange={(e)=>setColor(e.target.value)} className='w-8 h-6 border-none'/>

      </div>
    </div>
  )
}

export default App
