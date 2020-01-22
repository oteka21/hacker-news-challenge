import { createGlobalStyle } from 'styled-components'


export const GlobalStyles  = createGlobalStyle`
html{
  box-sizing: border-box;
  font-family: system-ui, Helvetica;
}
/* *, *:before, *:after{
  box-sizing: inherit;
} */
ul, li, h1, h2, h3, button, body {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
}
button { 
  background : transparent;
  border: 0;
  outline: 0
}
html, body, #app {
  margin: 0;
  height: 100%;
  width: 100%;
}

a { 
  color: inherit;
  text-decoration: none;
}

`

