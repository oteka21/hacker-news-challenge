import React, { useState, useEffect } from 'react'
import { fetchItem, fetchPosts, fetchComments } from '../utils/api'
import queryString from 'query-string'
import { Loading } from '../Components/Loading'
import { Consumer as ThemeConsumer } from '../Context/Theme'
import { Link } from 'react-router-dom'
import { Comment } from '../Components/Comment'


function useData(id){
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState(null)
  const [loadingPost, setLoadingPost] = useState(true)
  const [loadingComments, setLoadingComments] = useState(true)

  useEffect(() => {
    fetchItem(id)
    .then(post => {
      setPost(post)
      setLoadingPost(false)
      return fetchComments(post.kids || [])
    })
    .then(comments => {
      setComments(comments)
      setLoadingComments(false)
    })
  }, [])

  return { post, comments, loadingPost, loadingComments }
}


export default function Post(props){
  const { id: ida } = queryString.parse(props.location.search)
  const { post, comments, loadingPost, loadingComments } = useData(ida)
  const { by, title,time, url, descendants, id  } = post || {}
  return (
    <ThemeConsumer>
      {({theme}) => (
        <>
        {post && (
          <div className='post'>
          <h1><a className={`post-title-${theme}`} href={url}>{title}</a></h1>
          <p className={`post-info-${theme}`}>By <Link to={{pathname:'/user', search:`?id=${by}`}}>{by}</Link> on {new Date(time).toLocaleString()} with <Link  to={{pathname:'/post', search:`?id=${id}`}}>{descendants}</Link> comments</p>
        </div>
        )}
        {loadingComments && <Loading text='loading comments' speed={300} />}
        {comments && comments.map(comment => <Comment key={comment.id} {...comment}/>)}
        </>
      )}
    </ThemeConsumer>
  )
}