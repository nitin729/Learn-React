import { useId } from "react";

const InputBox = ({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "inr",
  amountDisable = false,
  currencyDisable = false,
}) => {
  const amountID = useId();

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex flex-row`}>
      <div className="w-1/2 flex flex-col">
        <label htmlFor={amountID} className="text-black/40 mb-2 inline-block">
          {label}
        </label>
        <input
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          placeholder="Amount"
          value={amount}
          id={amountID}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          disabled={amountDisable}
        />
      </div>
      <div className="w-1/2  flex flex-wrap justify-end text-right">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => {
            return (
              <option key={currency} value={currency}>
                {currency}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default InputBox;
