import { useId } from "react"

function Box({
  style,
  label,
  amount = 0,
  currency = "usd",
  options = ["usd"],
  onAmountChange = () => { },
  onCurrencyChange = () => { },
  disable = false
}) {

  const amountId = useId()

  return (
    <div className={`w-full bg-white p-3 rounded-lg text-sm flex ${style}`}>
      <div className="w-1/2">
        <label
          className="text-black/60 mb-2 inline-block text-base"
          htmlFor={amountId}
        >
          {label}
        </label>

        <input
          type="number"
          id={amountId}
          value={amount}
          disabled={disable}
          className="outline-none w-full bg-transparent py-1.5"
          onChange={(e) => { onAmountChange && onAmountChange(Number(e.target.value)) }}
        />
      </div>

      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black mb-2 w-full">
          Currency Type
        </p>

        <select
          id={label + "Currency"}
          value={currency}
          onChange={(e) => { onCurrencyChange && onCurrencyChange(e.target.value) }}
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
        >
          {options.map((option) =>
          (
            <option
              key={option}
              value={option}
              defaultValue={currency}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Box