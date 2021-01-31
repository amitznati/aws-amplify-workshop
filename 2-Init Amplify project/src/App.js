import React from 'react';

function PostsList() {
  const data = [
    {id: 1, title: 'dummy post 1', body: 'dummy body 1'},
    {id: 2, title: 'dummy post 2', body: 'dummy body 2'},
    {id: 3, title: 'dummy post 3', body: 'dummy body 3'}
  ]
  return (
      <>
        {data.map((post) => (
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
    console.log(JSON.parse(JSON.stringify({newPost})));
    setNewPost({title: '', body: ''});
  }
  const {title, body} = newPost;
  return (
    <form
      onSubmit={onSubmit}
    >
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
