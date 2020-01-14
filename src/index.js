import React from 'react'
import { render } from 'react-dom'
import { Nav } from './Components/Nav.jsx'
import { Provider as ThemeProvider } from './Context/Theme.js'
import { BrowserRouter as Router } from 'react-router-dom'
import './css/index.css'

function App(){
  return (
    <Router>
      <ThemeProvider>
        <div className='container'>
        <Nav />
        </div>
      </ThemeProvider>
    </Router>
  )
}


render(<App />, document.getElementById('app'))