import React from 'react'
import { fetchUser, fetchPosts } from '../utils/api'
import queryString from 'query-string'
import { PostItem } from '../Components/PostItem'
import { Consumer as ThemeConsumer } from '../Context/Theme'
import { Loading } from '../Components/Loading'

export default class User extends React.Component{
  constructor(props){
    super(props)


    this.state = {
      user: null,
      loading: true,
      posts: null,
      error: false
    }
  }

  componentDidMount(){
    const { id } = queryString.parse(this.props.location.search) 
    fetchUser(id)
    .then(user => {
      this.setState({
        user
      })
      return fetchPosts(user.submitted.slice(0,30))
    })
    .then(posts => this.setState({posts: posts, loading: false}))
    .catch(() => this.setState({
      loading: false,
      error: true
    }))
  }
  render(){
    const { user, loading, posts, error   } = this.state
    return (
      <ThemeConsumer>
        {({theme}) => (
          <>
            {error && <h1 className={`post-title-${theme}`}>There is an error trying to fetch data</h1>}
            {loading && <Loading text='Loading Posts' speed={300} />}
            {user && (
              <div className='post'>
                <h1 className={`post-title-${theme}`}>{user.id}</h1>
                <p className={`post-info-${theme}`}>joined {new Date(user.created).toLocaleDateString()} has {user.karma} karma</p>
              </div>
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
        )}
      </ThemeConsumer>
    )
  }
}