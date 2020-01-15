import React from 'react'
import { Consumer } from '../Context/Theme.js'
import { NavLink } from 'react-router-dom'

export function Nav(){
  return <Consumer>
    {({theme, toggleTheme}) => (
      <div className='row space-between'>
        <ul className='row nav'>
          <li><NavLink className='nav-link' exact activeStyle={{color: 'rgb(187, 46, 31)'}} to='/'>Top</NavLink></li>
          <li><NavLink className='nav-link' activeStyle={{color: 'rgb(187, 46, 31)'}} to='/new'>New</NavLink></li>
        </ul>
        <button
        style={{fontSize: 30}}
        className='btn-clear'
        onClick={toggleTheme}>
          {theme === 'light' ? '🔦': '💡'}
        </button>
      </div>
    )}
  </Consumer>
}