import React, { useState, useEffect } from 'react'
import { fetchMainPosts } from '../../utils/api'
import { Loading } from '../../Components/Loading'
import { PropTypes } from 'prop-types'
import { PostItem } from '../../Components/PostItem'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 20px;
`

export default function Posts(props){
  const [ posts, setPosts ] = useState(null)

  useEffect(() => {
    handleFetch()
  }, [])

  function handleFetch(){
    fetchMainPosts(props.type)
    .then(posts => setPosts(posts))
  }

  if(!posts){
    return <Loading  text='Loading Posts' speed={300} />
  }
  
  return (
    <Container>
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
    </Container>
  )
}

Posts.propTypes = {
  type: PropTypes.oneOf(['top', 'new'])
}