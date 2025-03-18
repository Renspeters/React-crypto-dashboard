import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#market">Market</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#settings">Settings</a></li>
          </ul>
        </nav>
        <div className="container-1">
          <div className="row-1">
            <div className="col-1">
              <h1>CryptoPuls</h1>
              <p>Klik om de laatste currency te bekijken</p>
              <a id="get-prices" href="#market">Bekijken</a>
              <h4>test</h4>
            </div>
          </div>
        </div>
        {/* <ul id="prices"></ul>  */}
    </>
  )
}

export default App
