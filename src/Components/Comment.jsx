import React from 'react'
import { Link } from 'react-router-dom'
import { Consumer as ThemeConsumer } from '../Context/Theme'


export function Comment({text, by, time }){
  return (
    <ThemeConsumer>
      {(({theme}) => (
        <div className='comment'>
          <p className={`post-info-${theme}`} >By <Link to={{pathname:'/user', search:`?id=${by}`}}>{by}</Link> on {new Date(time).toLocaleString()}</p>
          <p dangerouslySetInnerHTML={{__html: text}} ></p>
        </div>
      ))}
    </ThemeConsumer>
  )
}