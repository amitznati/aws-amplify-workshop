import React from 'react';
import {API, Storage} from 'aws-amplify';
import {AmplifyAuthenticator} from '@aws-amplify/ui-react';
import {listPosts} from './graphql/queries';
import {createPost, updatePost} from './graphql/mutations';

function PostsList() {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    API.graphql({query: listPosts}).then(response => {
      setPosts(response.data.listPosts.items);
    });
  }, []);

  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <div>{post.body}</div>
          {post.postImage &&
            <div>
              <img src={post.postImage} alt={post.title} />
            </div>
          }
        </div>
      ))}
    </>

  );
}

function CreatePost() {
  const [newPost, setNewPost] = React.useState({title: '', body: ''});
  const [image, setImage] = React.useState(null);
  const onImageChange = ({target: {validity, files: [file]}}) =>
    validity.valid && setImage(file);
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
      const postId = res.data.createPost.id;
      Storage.put(
        `${postId}.${image.name.split('.').pop()}`,
        image,
        {contentType: image.type})
        .then(storageRes => {
          API.graphql({
            query: updatePost,
            variables: {input: {id: postId, postImage: `https://d31q1uw73anovc.cloudfront.net/${storageRes.key}`}},
            authMode: 'AMAZON_COGNITO_USER_POOLS'
          }).then(() => {
            setNewPost({title: '', body: ''});
          });
      });
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
          <input type="file" name="postImage" accept="image/*" onChange={onImageChange} />
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
