import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'

/* const ReactElement = {
    element: 'img',
    props: {
        src: 'https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Random image',
        height: '500px',
        width: '500px'
    }
  } */
 
//customRender(ReactElement)

/*   const anotherElement = (
    <a href="https://google.com" target="blank"> Google</a>
  ) */
const newReactElement = React.createElement(
  'img',
  {
    src: 'https://plus.unsplash.com/premium_photo-1666900440561-94dcb6865554?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Random image',
    height: '500px',
    width: '500px'
  },
)
ReactDOM.createRoot(document.getElementById('root')).render(
  newReactElement
)
