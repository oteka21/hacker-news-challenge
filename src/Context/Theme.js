import React, { createContext, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from '../theme'

const context = createContext({})

export function Provider ({children}){
  const [ theme, setTheme ] = useState(()=> window.localStorage.getItem('theme') || 'light')


  const value = {
    theme,
    toggleTheme(){
      setTheme(theme => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        window.localStorage.setItem('theme',newTheme)
        return newTheme
      })
    }
  }

  return <context.Provider value={value}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
  </context.Provider>
}

export const Consumer = context.Consumer

export default context