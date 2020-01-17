import React, { Suspense, lazy } from 'react'
import { render } from 'react-dom'
import { Loading } from './Components/Loading'
import { Nav } from './Components/Nav'
import { Provider as ThemeProvider } from './Context/Theme.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './css/index.css'

const Posts  = lazy(() => import('./Containers/Posts'))
const Post  = lazy(() => import('./Containers/Post'))
const User  = lazy(() => import('./Containers/User'))

function App(){
  return (
    <Router>
      <ThemeProvider>
        <div className='container'>
        <Nav />
        <Switch>
          <Suspense fallback={<Loading text='Loading' speed={300} />}>
            <Route exact path='/' component={() => <Posts type='top' />} />
            <Route path='/new' component={() => <Posts type='new' />} />
            <Route path='/post' component={Post} />} />
            <Route path='/user' component={User} />
          </Suspense>
        </Switch>
        </div>
      </ThemeProvider>
    </Router>
  )
}


render(<App />, document.getElementById('app'))