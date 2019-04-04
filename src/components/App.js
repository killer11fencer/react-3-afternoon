import React, { Component } from 'react';
import axios from 'axios'
import Post from './Post/Post'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      arrayFilter:[]
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
axios.get('https://practiceapi.devmountain.com/api/posts')
.then(res =>{
  console.log('res in get', res)
  let post = res.data
      this.setState({
        posts: post,
        arrayFilter: post
      }) 
      
})
.catch(err => {
  console.log('err',err)
})
  }

  updatePost(id,text) {
  axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{text})
  .then( res => {
    console.log('res update',res)
    let post = res.data
      this.setState({
        posts: post
      })
  })
  .catch( err =>{
    console.log('err',err)
  })
  }

  deletePost(id) {
  axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
  .then( res => {
    console.log('res in delete', res)
    let post = res.data
      this.setState({
        posts: post
      })
  })
  .catch(err => {
    console.log('err',err)
  })
  }

  createPost(text) {
  axios.post('https://practiceapi.devmountain.com/api/posts',{text})
  .then(res => {
    console.log('res in Post',res)
    let post = res.data
      this.setState({
        posts: post
      })
  })
  .catch( err => {
    console.log('err', err)
  })
  }

  searchPosts = (text) => {
    let filteredPosts = this.state.arrayFilter.filter(elem => elem.text.includes(text))
      
      this.setState({
      posts:filteredPosts
  })
}

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header search={this.searchPosts}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {posts.map((post) => <Post key={post.id}
                                        text={post.text}
                                        date={post.date}
                                        updatePostFn={this.updatePost}
                                        id={post.id}
                                        deletePostFn={this.deletePost}
                                        />)}

        </section>
      </div>
    );
  }
}

export default App;
