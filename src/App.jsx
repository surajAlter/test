import { useState, useEffect, useRef } from 'react';
import './App.css';

const audio = new Audio("alarm.mp3")

function App() {
  //Constants
  const pomo = 25, short = 5, long = 15, pomoclr = "[#ba4949]", shortclr = "teal-600", longclr = "cyan-700"

  //For start/stop button
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [limit, setLimit] = useState(pomo)
  const [bgColor, setBgColor] = useState(`bg-${pomoclr}`)
  let timer = useRef(null)

  useEffect(() => {
    //If timer expired
    if (seconds >= limit) {
      if (isRunning) {
        window.alert("Please reset the timer!");
        setIsRunning(false);
      }
      return;
    }

    if (isRunning) {
      timer.current = setInterval(() => {
        setSeconds(prev => {
          if (prev >= limit - 1) {
            clearInterval(timer.current);
            setIsRunning(false);
            if (audio.paused) {
              audio.play();
            }
          }

          return prev + 1
        })
      }, 1000);
    } else {
      clearInterval(timer.current)
    }

    return () => clearInterval(timer.current)
  }, [isRunning, limit])

  //For mode change and reset
  const modeHandler = (mode = "") => {
    //stop timer and set time back to 0
    if (isRunning) setIsRunning(prev => !prev)
    setSeconds(0)

    audio.pause();
    audio.currentTime = 0;

    //for reset
    if (mode === "") return

    //mode change
    if (mode === pomo) {
      setBgColor(`bg-${pomoclr}`)
    } else if (mode === short) {
      setBgColor(`bg-${shortclr}`)
    } else {
      setBgColor(`bg-${longclr}`)
    }
    setLimit(mode)
  }

  //formatting in timer string with leading zero if necessary
  const format = (time) => (time <= 9) ? "0" + String(time) : String(time)

  return (
    <div
      className={`w-full h-screen ${bgColor} transition-colors duration-1000 text-gray-200 flex flex-col items-center justify-between p-4`}
    >
      <div
        className='w-full max-w-screen-sm flex mt-4 md:mt-10'
      >
        <p
          className='text-2xl md:text-3xl font-bold w-1/2'
        >
          Pomodro
        </p>
        <div
          className='text-right w-1/2 space-x-2'
        >
          <button
            className='bg-white/20 backdrop-blur-sm rounded-md px-3 py-1'
          >
            Settings
          </button>

          <button
            className='bg-white/20 backdrop-blur-sm rounded-md p-1'
          >
            <a
              href='https://github.com/suraj-sutradhar0702'
              className='bg-violet-900 rounded-lg px-2'
              target='__blank'
            >
              S
            </a>
          </button>
        </div>
      </div>

      <div
        className="w-full max-w-md rounded-md bg-white/20 backdrop-blur-sm p-6 text-center">
        <div
          className=''
        >
          <button
            className={`rounded-md px-2 py-1 ${limit === pomo ? "bg-black/30 backdrop-blur-sm" : ""}`}
            onClick={() => modeHandler(pomo)}
          >
            Pomodoro
          </button>
          <button
            className={`rounded-md p-2 ${limit === short ? "bg-black/30 backdrop-blur-sm" : ""}`}
            onClick={() => modeHandler(short)}
          >
            Short Break
          </button>
          <button
            className={`rounded-md p-2 ${limit === long ? "bg-black/30 backdrop-blur-sm" : ""}`}
            onClick={() => modeHandler(long)}
          >
            Long Break
          </button>
        </div>
        <div
          className='text-5xl md:text-8xl font-bold my-5'
        >
          {format((limit - Math.ceil(seconds / 60)))}:{format((60 - (seconds % 60)) % 60)}
        </div>

        <div
          className='flex justify-center'
        >
          <button
            className='bg-white font-bold text-black text-2xl rounded-l-lg py-1 md:py-3 w-32 md:w-40'
            onClick={() => setIsRunning((prev) => (!prev))}
          >
            {isRunning ? "STOP" : "START"}
          </button>

          <button
            className='bg-white rounded-r-lg py-3 w-10 flex items-center justify-center border-l-2 border-gray-500'
            onClick={() => modeHandler()}
          >
            <img
              src="./reset.svg"
              alt="reset"
              className='h-6 w-6'
            />
          </button>
        </div>
        <div className='p-3 md:p-5 text-xl font-bold'>
          {(limit === pomo) ? "Let's Focus!" : ((limit === short) ? "Don't strain on your eyes." : "Enjoy! It's a long break!")}
        </div>

      </div>

      <div>
        Made by Suraj Sutradhar
      </div>
    </div>
  );
}

export default App;
