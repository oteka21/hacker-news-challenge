import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Container, Info } from './styles' 


export function Comment({text, by, time }){
  return (
      <Container>
        <Info>By <Link to={{pathname:'/user', search:`?id=${by}`}}>{by}</Link> on {new Date(time).toLocaleString()}</Info>
        <p dangerouslySetInnerHTML={{__html: text}} ></p>
      </Container>
  )
}

Comment.propTypes = {
  text: PropTypes.string.isRequired,
  by: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired
}