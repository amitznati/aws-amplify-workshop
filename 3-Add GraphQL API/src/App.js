import React from 'react';
import {API} from 'aws-amplify';
import {listPosts} from './graphql/queries';
import {createPost} from './graphql/mutations';

function PostsList() {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    // Calling the API with listPosts query
    API.graphql({query: listPosts}).then(response => {
      // Setting posts from response
      setPosts(response.data.listPosts.items);
    });
  }, []);

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <div>{post.body}</div>
        </div>
      ))}
    </>

  );
}

function CreatePost() {
  const [newPost, setNewPost] = React.useState({title: '', body: ''});

  const onValueChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    });
  }
  const onSubmit = e => {
    e.preventDefault();
    if (!(newPost.title && newPost.body)) return;
    API.graphql({
      query: createPost,
      variables: {input: newPost},
    }).then(res => {
      setNewPost({title: '', body: ''});
      console.log(res);
    });
  }
  const {title, body} = newPost;
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Title</label>
        <input type="text" name="title" required value={title} onChange={onValueChange} />
        <label>Body</label>
        <input type="text" name="body" required value={body} onChange={onValueChange} />
        <button type="submit">Add Post</button>
      </div>
    </form>
  );
}

export default function App() {
  return (
    <div>
      <h1>AWS Amplify Workshop 🚀</h1>
      <CreatePost />
      <PostsList />
    </div>
  );
}
