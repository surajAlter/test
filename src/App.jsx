import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState("DodgerBlue")
  return (
    <div id="container" className='w-screen h-screen flex flex-col items-center justify-end pb-4 text-slate-300'
      style={{backgroundColor:color}}
    >
      <h1 className='text-2xl font-bold'>Select Color</h1>
      <div className="bg-gray-300 px-4 py-2 rounded-full flex flex-wrap justify-between w-96 my-4 text-black  shadow-lg shadow-slate-400 text-white">
        <button onClick={()=>setColor("red")} className='hover:ring-2 hover:ring-black hover:ring-offset-1 bg-red-700 rounded-lg  px-3 py-2'>Red</button>
        <button onClick={()=>setColor("green")} className='hover:ring-2 hover:ring-black hover:ring-offset-1 bg-green-700 rounded-lg px-3 py-2'>Green</button>
        <button onClick={()=>setColor("blue")} className='hover:ring-2 hover:ring-black hover:ring-offset-1 bg-blue-700 rounded-lg px-3 py-2'>Blue</button>
        <button onClick={()=>setColor("black")} className='hover:ring-2 hover:ring-black hover:ring-offset-1 bg-black rounded-lg px-3 py-2'>Black</button>
      </div>
    </div>
  )
}

export default App
