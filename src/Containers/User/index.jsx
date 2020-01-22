import React, { useState, useEffect } from 'react'
import { fetchUser, fetchPosts } from '../../utils/api'
import queryString from 'query-string'
import { PostItem } from '../../Components/PostItem'
import { Loading } from '../../Components/Loading'
import { Title, Info } from '../../styles'
import { Container } from './styles'

function useData(id){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchUser(id)
    .then(user => {
      setUser(user)
      return fetchPosts(user.submitted.slice(0,30))
    })
    .then(posts => {
      setPosts(posts)
      setLoading(false)
    })
    .catch(() => {
      setLoading(false)
      setError(true)
    })
  }, [])

  return { user, loading, posts, error }
}

export default function User(props){
  const { id: ida } = queryString.parse(props.location.search) 
  const { user, loading, posts, error } = useData(ida)
  return (
        <>
          {error && <Title>There is an error trying to fetch data</Title>}
          {loading && <Loading text='Loading Posts' speed={300} />}
          {user && (
            <Container>
              <Title>{user.id}</Title>
              <Info>joined {new Date(user.created).toLocaleString()} has {user.karma.toLocaleString()} karma</Info>
            </Container>
          )}
          {posts && (
            <ul style={{marginTop: 20}}>
              {posts.map(({by, title, url, time, descendants, id}) => 
                <PostItem 
                author={by}
                title={title}
                url={url}
                date={new Date(time).toLocaleString()}
                id={id}
                comments={descendants} 
                key={id} 
                />)}
            </ul>
          )}
        </>
    )
}