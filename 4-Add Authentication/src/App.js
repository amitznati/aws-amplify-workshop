import React from 'react';
import {API} from 'aws-amplify';
import {AmplifyAuthenticator} from '@aws-amplify/ui-react';
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
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    }).then(res => {
      setNewPost({title: '', body: ''});
      console.log(res);
    });
  }
  const {title, body} = newPost;
  return (
    <AmplifyAuthenticator>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input type="text" name="title" required value={title} onChange={onValueChange} />
          <label>Body</label>
          <input type="text" name="body" required value={body} onChange={onValueChange} />
          <button type="submit">Add Post</button>
        </div>
      </form>
    </AmplifyAuthenticator>
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
