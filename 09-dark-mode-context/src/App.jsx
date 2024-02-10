import "./App.css";
import Card from "./components/Card.jsx";
import ThemeBtn from "./components/ThemeBtn.jsx";
import { ThemeContextProvider } from "./context/theme.js";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = (event) => {
    if (!event) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  return (
    <ThemeContextProvider value={{ theme, toggleTheme }}>
      <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>
          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>
    </ThemeContextProvider>
  );
}

export default App;
