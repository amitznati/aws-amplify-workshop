# 3. Add GraphQL Api

````
amplify add api
````
* Select GraphQL for the API type
* Select _API key_ for the authentication type (we'll add authentication in the next steps)
````
λ amplify add api
? Please select from one of the below mentioned services: GraphQL
? Provide API name: awsamplifyworkshop
? Choose the default authorization type for the API API key
? Enter a description for the API key: public
? After how many days from now the API key should expire (1-365): 365
? Do you want to configure advanced settings for the GraphQL API No, I am done.
? Do you have an annotated GraphQL schema? No
? Choose a schema template: Single object with fields (e.g., “Todo” with ID, name, description)

The following types do not have '@auth' enabled. Consider using @auth with @model
         - Todo
Learn more about @auth here: https://docs.amplify.aws/cli/graphql-transformer/auth


GraphQL schema compiled successfully.

Edit your schema at C:\Users\amitz\Documents\GitHub\aws-amplify-workshop\amplify\backend\api\awsamplifyworkshop\schema.graphql or place .graphql files in a directory at C:\Users\amitz\Documents\GitHub\aws-amplify-workshop\amplify\backend\api\awsamplifyworkshop\schema
? Do you want to edit the schema now? No
Successfully added resource awsamplifyworkshop locally

Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
````

Once the API created we can now edit the data schema, 
go to: amplify/backend/api/awsamplifyworkshop/schema.graphql

Change the default schema, define Post model
````graphql
type Post
@model
@auth(rules: [{allow: public}])
{
    id: ID!
    title: String!
    body: String
}
````

_by adding @model annotation amplify will create for us queries, mutations and subscriptions_

_we're setting the authentication as public (anyone can read/write), we'll enhance it when we'll add authentication_

#### Testing the API

Enhance PostsList widget to retrieve posts from the API

Import API and listPosts query
```javascript
import {API} from 'aws-amplify';
import {listPosts} from './graphql/queries';
```
Retrieve posts from the API
````javascript
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
````

Enhance CreatePost widget to integrate with API

Import createPost mutation
````javascript
import {createPost} from './graphql/mutations';
````
Change onSubmit
````javascript
function CreatePost() {
  // ...
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
  // ...
}
````

#### Running mock API

We can test the API before deploy it to cloud, run:
````
amplify mock
````
````
λ amplify mock

GraphQL schema compiled successfully.

Edit your schema at C:\Users\amitz\Documents\GitHub\aws-amplify-workshop\amplify\backend\api\awsamplifyworkshop\schema.graphql or place .graphql files in a directory at C:\Users\amitz\Documents\GitHub\aws-amplify-workshop\amplify\backend\api\awsamplifyworkshop\schema
Running GraphQL codegen
? Choose the code generation language target javascript
? Enter the file name pattern of graphql queries, mutations and subscriptions src\graphql\**\*.js
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested] 2
√ Generated GraphQL operations successfully and saved at src\graphql
AppSync Mock endpoint is running at http://xxx.xxx.xxx.x:20002
````
Open another terminal and run
```
npm start
```

After test done, we can now deploy the API, run:
````
amplify push
````
````
λ amplify push
√ Successfully pulled backend environment dev from the cloud.

Current Environment: dev

| Category | Resource name      | Operation | Provider plugin   |
| -------- | ------------------ | --------- | ----------------- |
| Api      | awsamplifyworkshop | Create    | awscloudformation |
? Are you sure you want to continue? Yes

GraphQL schema compiled successfully.

Edit your schema at C:\Users\amitz\Documents\GitHub\aws-amplify-workshop\amplify\backend\api\awsamplifyworkshop\schema.graphql or place .graphql files in a directory at C:\Users\amitz\Documents\GitHub\aws-amplify-workshop\amplify\backend\api\awsamplifyworkshop\schema
? Do you want to update code for your updated GraphQL API Yes
? Do you want to generate GraphQL statements (queries, mutations and subscription) based on your schema types?
This will overwrite your current graphql queries, mutations and subscriptions Yes
````
Process to deploy the API to Amazon cloud will start, in the end you should see:
````
...
√ Generated GraphQL operations successfully and saved at src\graphql
√ All resources are updated in the cloud

GraphQL endpoint: https://xxxxxxxxxxxxxxxxxx.appsync-api.us-east-1.amazonaws.com/graphql
GraphQL API KEY: xxx-xxxxxxxxxxxxx
````
We can view the API data, queries, configuration etc. in Amazon [AppSync](https://console.aws.amazon.com/appsync/home?region=us-east-1#/apis)
