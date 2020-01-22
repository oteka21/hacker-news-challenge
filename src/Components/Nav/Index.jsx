import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Button, NavList } from './styles'
import ThemeContext from '../../Context/Theme'
export function Nav(){
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <Container>
      <NavList>
        <li><NavLink className='nav-link' exact activeStyle={{color: 'rgb(187, 46, 31)'}} to='/'>Top</NavLink></li>
        <li><NavLink className='nav-link' activeStyle={{color: 'rgb(187, 46, 31)'}} to='/new'>New</NavLink></li>
      </NavList>
      <Button
        onClick={toggleTheme}>
        {theme === 'light' ? '🔦': '💡'}
      </Button>
    </Container>
  )
}