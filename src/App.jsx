import './App.css'
import { useState, useEffect, useCallback, useRef } from 'react'

function App() {
  const [len, setLen] = useState(8)
  const [chars, setChars] = useState(0)
  const [ints, setInts] = useState(0)
  const [passwd, setPasswd] = useState("")
  const passwdRef = useRef(null)

  const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

  const generate = useCallback(() => {
    let s = allowedChars
    
    if(ints) s += "0123456789"
    if(chars) s += "!@#$%^&*()_+-=[]{}|,.<>/?`~"

    let pwd = ""
    for(let i = 0; i < len; i++) {
      pwd += s[Math.floor(Math.random() * s.length)]
    }
    setPasswd(pwd)
  }, [len, chars, ints,setPasswd])

  useEffect(() => {
    generate()
  }, [ints, chars, len, generate])

  let copyPasswd = ()=> {
    passwdRef.current?.select()
    window.navigator.clipboard.writeText(passwd)
  }

  return (
    <div
    className='w-screen h-screen bg-gradient-to-br from-purple-950 to-sky-500 text-white text-center py-8'
    >
      <div
      className='bg-slate-800 border-white shadow-md border-4 w-full max-w-xl mx-auto rounded-lg py-8 px-2 space-y-5'
      >
        <p className="text-4xl font-serif">Password Generator</p>
        <div>
          <input
          type="text"
          value={passwd}
          className='rounded-l-md text-black outline-none px-2 py-2'
          readOnly
          ref={passwdRef}
          />
          <button
          type="button"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-white-300 focus:ring-offset-1 dark:focus:ring-white-800 font-medium rounded-r-lg text-sm px-5 py-3 text-center w-max"
          onClick={copyPasswd}
          >
            Copy
          </button>
          {/* <button
          className='bg-blue-700 text-white px-2 rounded-r-md py-2 clickable'
          onClick={() => navigator.clipboard.writeText(passwd)}
          >
            Copy
          </button> */}
        </div>

        <div className='flex justify-center gap-x-4 flex-wrap'>
          
          <div className='flex gap-x-2'>
            <input
            type="range"
            id=""
            min="8"
            max="30"
            defaultValue={len}
            onChange={(e) => setLen(e.target.value)}
            />

            <p>{"Length ("+len+")"}</p>
          </div>

          <div className="flex gap-x-2">
            <input
            type="checkbox"
            name="chars"
            defaultChecked={chars}
            onChange={()=>{setChars(!chars)}}
            />
            
            <label htmlFor="chars">Special Chars</label>
          </div>

          <div className='flex gap-x-2'>
            <input
            type="checkbox"
            name="ints"
            defaultChecked={ints}
            onChange={()=>{setInts(!ints)}}
            />
            
            <label htmlFor="ints">Integers</label>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default App
