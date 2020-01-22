import React, { Suspense, lazy } from 'react'
import { render } from 'react-dom'
import { Loading } from './Components/Loading'
import { Nav } from './Components/Nav'
import { Provider as ThemeProvider } from './Context/Theme.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Consumer as ThemeConsumer } from './Context/Theme'
import { GlobalStyles } from './styles/globalStyles'
import { Container } from './styles/index'

const Posts  = lazy(() => import('./Containers/Posts'))
const Post  = lazy(() => import('./Containers/Post'))
const User  = lazy(() => import('./Containers/User'))

function App(){
  return (
    <Router>
      <ThemeProvider>
        <GlobalStyles />
        <Container>
          <Nav />
          <Suspense fallback={<Loading text='Loading' speed={300} />}>
            <Switch>
                <Route exact path='/' component={() => <Posts type='top' />} />
                <Route exact path='/new' component={() => <Posts type='new' />} />
                <Route exact path='/post' component={Post} />
                <Route path='/user' component={User} />
                <Route render={() => <ThemeConsumer>
                  {({theme}) => <h1>404 {theme === 'light' ? '✋🏿' : '✋🏻'}</h1>}
                </ThemeConsumer>} />
            </Switch>
          </Suspense>
        </Container>
      </ThemeProvider>
    </Router>
  )
}


render(<App />, document.getElementById('app'))