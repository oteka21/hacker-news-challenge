import React from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { Consumer as ThemeConsumer } from '../Context/Theme'

export function PostItem({title,author,comments, date, url, id}){
  return (
    <ThemeConsumer>
      {({theme}) => (
        <li className='post'>
          <h3><a className={`post-title-${theme}`} href={url}>{title}</a></h3>
          <p className={`post-info-${theme}`}>By <Link to={{pathname:'/user', search:`?id=${author}`}}>{author}</Link> on {date} with <Link  to={{pathname:'/post', search:`?id=${id}`}}>{comments}</Link> comments</p>
        </li>
      )}
    </ThemeConsumer>
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
