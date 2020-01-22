import React, { useState, useEffect, useContext } from 'react'
import { fetchItem, fetchPosts, fetchComments } from '../../utils/api'
import queryString from 'query-string'
import { Loading } from '../../Components/Loading'
import themeContext from '../../Context/Theme'
import { Link } from 'react-router-dom'
import { Comment } from '../../Components/Comment'
import { Container, Title } from './styles' 
import { Info } from '../../styles'

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
  const { theme } = useContext(themeContext)
  return (
    <>
    {post && (
    <Container>
      <Title><a href={url}>{title}</a></Title>
      <Info>By <Link to={{pathname:'/user', search:`?id=${by}`}}>{by}</Link> on {new Date(time).toLocaleString()} with <Link  to={{pathname:'/post', search:`?id=${id}`}}>{descendants}</Link> comments</Info>
    </Container>
    )}
    {loadingComments && <Loading text='loading comments' speed={300} />}
    {comments && comments.map(comment => <Comment key={comment.id} {...comment}/>)}
    </>
  )
}