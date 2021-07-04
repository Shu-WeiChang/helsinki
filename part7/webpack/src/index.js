import App from './App';
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const hello = name => {
  console.log(`hello ${name}`)
}
ReactDOM.render(<App />, document.getElementById('root'))

App()
