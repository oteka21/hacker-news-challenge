import React, { Component } from 'react'
import { fetchMainPosts } from '../utils/api'
import { Loading } from './Loading'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { Consumer as ThemeConsumer } from '../Context/Theme'

function Post({title,author,comments, date, url, id}){
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


export default class Posts  extends Component {
  constructor(props){
    super(props)

    this.state = {
      posts : null
    }

    this.handleFetch = this.handleFetch.bind(this)
  }

  componentDidMount(){
    this.handleFetch()
  }

  handleFetch(){
    fetchMainPosts(this.props.type)
    .then(posts => console.log(posts) || this.setState({posts}))
  }

  render(){
    const { posts } = this.state
    if(!posts){
      return <Loading  text='Loading Posts' speed={300} />
    }
    return (
      <ul style={{marginTop: 20}}>
        {posts.map(({by, title, url, time, descendants, id}) => 
          <Post 
          author={by}
          title={title}
          url={url}
          date={new Date(time).toLocaleString()}
          id={id}
          comments={descendants} 
          key={id} 
          />)}
      </ul>
    )
  }
}

Posts.propTypes = {
  type: PropTypes.oneOf(['top', 'new'])
}