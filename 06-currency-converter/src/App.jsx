import InputBox from "./components/InputBox";
import { useCurrencyInfo } from "./hooks/useCurrencyInfo.js";
import { useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  let currencyOptions = Object.keys(currencyInfo);
  const swap = () => {
    setFrom(() => to);
    setTo(() => from);
    setAmount(() => convertedAmount);
    setConvertedAmount(() => amount);
    convert();
  };
  const convert = () => {
    setConvertedAmount(() => amount * currencyInfo[to]);
    setAmount(() => amount * currencyInfo[from]);
  };
  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1645226880663-81561dcab0ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                amount={amount}
                label="From"
                selectCurrency={from}
                currencyOptions={currencyOptions}
                onAmountChange={(amnt) => setAmount(amnt)}
                onCurrencyChange={(currency) => setFrom(currency)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                className="absolute left-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                amount={convertedAmount}
                label="To"
                selectCurrency={to}
                currencyOptions={currencyOptions}
                onAmountChange={(convertedAmnt) =>
                  setConvertedAmount(convertedAmnt)
                }
                amountDisable
                onCurrencyChange={(currency) => setTo(currency)}
              />
            </div>
            <button className="bg-white w-full rounded-lg bg-black text-white px-2 py-2 mt-2">
              Convert
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
