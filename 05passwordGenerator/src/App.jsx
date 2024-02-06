import { useState, useCallback, useEffect,useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  //useRef
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let num = '0123456789';
    let chars = '!@#$%^&*()_+'
    if(numAllowed) {
      str = str + num;
    }
    if(charAllowed) {
      str = str + chars;
    }
    if(numAllowed && charAllowed) {
      str = str + num + chars;
    }
    for(let i = 1; i <= length; i++) {
      let char = Math.floor((Math.random() * str.length + 1))
      pass = pass + str.charAt(char)
    }
    setPassword(pass);
  },[length, numAllowed, charAllowed, setPassword])

const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 20);
  window.navigator.clipboard.writeText(password)
},[password])

  useEffect(() => {
    passwordGenerator();
  },[length, numAllowed, charAllowed , passwordGenerator])

  return (
    <>
 
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-700'>
    <h1 className='text-2xl text-center text-white my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" 
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder='Password'
          ref={passwordRef}
          readOnly        />
          <button className='outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 hover:bg-blue-700 hover:scale-0.5' onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-3'>
        <div className="flex items-center gap-x-1">
          <input 
            type="range" 
            min={6}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{ setLength(e.target.value)}}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox"
            defaultChecked={numAllowed}
            id='numInput'
            onChange={()=>{
              setNumAllowed((prevNumAllowed) => !prevNumAllowed);
            }}
          />
          <label htmlFor="length">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id='charInput'
            onChange={()=>{
              setCharAllowed((prevCharAllowed)=> !prevCharAllowed);   
            }}
          />
          <label htmlFor="length">Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
