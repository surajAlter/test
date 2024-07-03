import { useEffect, useState } from 'react'
import './App.css'
import { Box } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [fromAmount, setFromAmount] = useState(0)
  const [toAmount, setToAmount] = useState(0)
  const [fromCurrency, setFromCurrency] = useState("inr")
  const [toCurrency, setToCurrency] = useState("usd")
  const currencyInfo = useCurrencyInfo(fromCurrency)

  const updateAmount = () => {
    let amount = (fromAmount * currencyInfo[toCurrency])
    if (amount % 1 !== 0) amount = amount.toFixed(2)
    setToAmount(amount)
  }

  const swap = () => {
    let temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  return (
    <div
      className='w-full h-screen flex flex-wrap justify-center items-end py-4 bg-cover bg-no-repeat'
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div
        className="w-full"
      >
        <div
          className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 flex flex-col items-center"
          onKeyDown={(e) => { e.key === "Enter" && updateAmount() }}
        >
          <p
            className='text-white text-3xl font-bold mb-8'
          >
            Currency Converter
          </p>
          <Box
            label="From"
            amount={fromAmount}
            currency={fromCurrency}
            options={Object.keys(currencyInfo)}
            onAmountChange={setFromAmount}
            onCurrencyChange={setFromCurrency}
          />

          <button
            onClick={swap}
            className="px-4 py-2 bg-black text-white rounded-lg -my-2 z-10
            focus:ring-1 focus:ring-black focus:ring-offset-2"
          >
            Swap
          </button>

          <Box
            label="To"
            amount={toAmount}
            currency={toCurrency}
            options={Object.keys(currencyInfo)}
            onAmountChange={setToAmount}
            onCurrencyChange={setToCurrency}
            disable={true}
          />

          <button
            onClick={updateAmount}
            className="
            bg-gradient-to-r hover:from-indigo-500 hover:via-pink-500 hover:to-yellow-500 from-indigo-600 via-pink-600 to-red-600 focus:outline-none text-white uppercase
            w-58 px-4 py-2 bg-black rounded-lg shadow-lg mt-4 focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Convert {fromCurrency} to {toCurrency}
          </button>
        </div>
      </div>
      <p
        className='text-white'
      >Made by Suraj Sutradhar</p>
    </div>
  )
}

export default App
