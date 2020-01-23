import React from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { Container, Title } from './styles'
import { Info } from '../../styles'

export function PostItem({title,author,comments, date, url, id}){
  return (
    <Container>
      <Title><a href={url}>{title}</a></Title>
      <Info> By <Link 
        to={{pathname:'/user', search:`?id=${author}`}}
        > {author} </Link>on {date} with 
        <Link  
        to={{pathname:'/post', search:`?id=${id}`}}>
          {comments}
        </Link>
        comments
      </Info>
    </Container>
  )
}

PostItem.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string,
  id: PropTypes.number.isRequired
}
