import React from 'react'
import { fetchItem, fetchPosts, fetchComments } from '../utils/api'
import queryString from 'query-string'
import { Loading } from '../Components/Loading'
import { Consumer as ThemeConsumer } from '../Context/Theme'
import { Link } from 'react-router-dom'
import { Comment } from '../Components/Comment'
export default class Post extends React.Component{
  constructor(props){
    super(props)

    this.state = { 
      post: null,
      comments: null,
      loadingPost: true,
      loadingComments: true 
    }
  }


  componentDidMount(){
    console.log(this.props)
    const { id } = queryString.parse(this.props.location.search)
    fetchItem(id)
    .then(post => {
      console.log(post)
      this.setState({
        post,
        loadingPost: false
      })
      return fetchComments(post.kids || [])
    })
    .then(comments => console.log(comments) || this.setState({
      comments,
      loadingComments: false
    }))
  }
  render(){
    const { post, comments, loadingComments, loadingPost } = this.state
    const { by, title,time, url, descendants, id  } = post || {}
    return (
      <ThemeConsumer>
        {({theme}) => (
          <>
          {post && (
            <div className='post'>
            <h1><a className={`post-title-${theme}`} href={url}>{title}</a></h1>
            <p className={`post-info-${theme}`}>By <Link to={{pathname:'/user', search:`?id=${by}`}}>{by}</Link> on {new Date(time).toLocaleDateString()} with <Link  to={{pathname:'/post', search:`?id=${id}`}}>{descendants}</Link> comments</p>
          </div>
          )}
          {loadingComments && <Loading text='loading comments' speed={300} />}
          {comments && comments.map(comment => <Comment key={comment.id} {...comment}/>)}
          </>
        )}
      </ThemeConsumer>
    )
  }
}