import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState("START");
  const [selectedMode, setSelectedMode] = useState("Pomodoro");
  const [bgColor, setbgColor] = useState("bg-[#ba4949]");
  const timerIdRef = useRef(null);
  const alertShownRef = useRef(false);

  const decrementTime = () => {
    setSeconds((prevSeconds) => {
      if (prevSeconds > 0) {
        return prevSeconds - 1;
      } else {
        if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          return 59;
        } else {
          clearInterval(timerIdRef.current);
          setStart("START");
          if (!alertShownRef.current) {
            alert('Time\'s up!');
            alertShownRef.current = true;
          }
          return 0;
        }
      }
    });
  };

  const setTimer = () => {
    if (start === "STOP") {
      setStart("START");
      clearInterval(timerIdRef.current);
    } else {
      setStart("STOP");
      alertShownRef.current = false;
      decrementTime();
      timerIdRef.current = setInterval(decrementTime, 1000);
    }
  };

  const resetTimer = () => {
    clearInterval(timerIdRef.current);
    setStart("START");
    if (selectedMode === "Pomodoro") {
      setMinutes(25);
      setSeconds(0);
    } else if (selectedMode === "Short Break") {
      setMinutes(5);
      setSeconds(0);
    } else if (selectedMode === "Long Break") {
      setMinutes(15);
      setSeconds(0);
    }
  };

  const selectMode = (mode) => {
    setSelectedMode(mode);
    if (mode === "Pomodoro") {
      setbgColor("bg-rose-500")
      setMinutes(25)
    } else if (mode === "Short Break") {
      setbgColor("bg-teal-600")
      setMinutes(5)
    } else if (mode === "Long Break") {
      setbgColor("bg-cyan-700")
      setMinutes(15)
    }
    setSeconds(0);
    clearInterval(timerIdRef.current);
    setStart("START");
  };

  useEffect(() => {
    return () => clearInterval(timerIdRef.current);
  }, []);

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
            <div
              className='bg-violet-900 rounded-lg px-2'
            >
              S
            </div>
          </button>
        </div>
      </div>

      <div
        className="w-full max-w-md rounded-md bg-white/20 backdrop-blur-sm p-6 text-center">
        <div
          className=''
        >
          <button
            className={`rounded-md px-2 py-1 ${selectedMode === "Pomodoro" ? "bg-black/30 backdrop-blur-sm" : ""}`}
            onClick={() => selectMode("Pomodoro")}
          >
            Pomodoro
          </button>
          <button
            className={`rounded-md p-2 ${selectedMode === "Short Break" ? "bg-black/30 backdrop-blur-sm" : ""}`}
            onClick={() => selectMode("Short Break")}
          >
            Short Break
          </button>
          <button
            className={`rounded-md p-2 ${selectedMode === "Long Break" ? "bg-black/30 backdrop-blur-sm" : ""}`}
            onClick={() => selectMode("Long Break")}
          >
            Long Break
          </button>
        </div>
        <div
          className='text-5xl md:text-8xl font-bold my-5'
        >
          {(minutes < 10) ? `0${minutes}` : minutes}:{(seconds < 10) ? `0${seconds}` : seconds}
        </div>

        <div
          className='flex justify-center'
        >
          <button
            className='bg-white font-bold text-black text-2xl rounded-l-lg py-1 md:py-3 w-32 md:w-40'
            onClick={setTimer}
          >
            {start}
          </button>

          <button
            className='bg-white rounded-r-lg py-3 w-10 flex items-center justify-center border-l-2 border-gray-500'
            onClick={resetTimer}
          >
            <img
              src="./reset.svg"
              alt="reset"
              className='h-6 w-6'
            />
          </button>
        </div>
      </div>

      <div>
        Made by Suraj Sutradhar
      </div>
    </div>
  );
}

export default App;
