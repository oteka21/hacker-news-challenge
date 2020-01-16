import React, { Component } from 'react'
import { fetchMainPosts } from '../utils/api'
import { Loading } from '../Components/Loading'
import { PropTypes } from 'prop-types'
import { PostItem } from '../Components/PostItem'


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
    .then(posts => this.setState({posts}))
  }

  render(){
    const { posts } = this.state
    if(!posts){
      return <Loading  text='Loading Posts' speed={300} />
    }
    return (
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
    )
  }
}

Posts.propTypes = {
  type: PropTypes.oneOf(['top', 'new'])
}