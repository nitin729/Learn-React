import { useState } from 'react'
import Colors from './components/Colors'
import './App.css'

function App() {
  const [color, setColor] = useState('olive');
  function onChangeBgColor(color) {
    setColor(color);
  }

  return (
    <>
    <div className='w-full h-screen duration-200' style={{backgroundColor: color}}>
      <Colors changeBgColor={onChangeBgColor}/>
    </div>
    </>
  )
}

export default App
