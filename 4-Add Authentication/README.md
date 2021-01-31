# 4. Add Authentication

few words on auth, mixed auth
````
amplify add auth
````
Select _Default configuration_ and _Username_ for sign in method

```
amplify add auth
Using service: Cognito, provided by: awscloudformation

 The current configured provider is Amazon Cognito.

 Do you want to use the default authentication and security configuration? Default configuration
 Warning: you will not be able to edit these selections.
 How do you want users to be able to sign in? Username
 Do you want to configure advanced settings? No, I am done.
Successfully added auth resource awsamplifyworkshopc4bf374f locally

Some next steps:
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud
```

Deploy the change
```
amplify push
```
````
λ amplify push
√ Successfully pulled backend environment dev from the cloud.

Current Environment: dev

| Category | Resource name              | Operation | Provider plugin   |
| -------- | -------------------------- | --------- | ----------------- |
| Auth     | awsamplifyworkshopc4bf374f | Create    | awscloudformation |
| Api      | awsamplifyworkshop         | No Change | awscloudformation |
? Are you sure you want to continue? Yes
\ Updating resources in the cloud. This may take a few minutes...
....
....
√ All resources are updated in the cloud
````

### Use the Authentication

Wrap the CreatPost widget with _AmplifyAuthenticator_ so that only sign in users can access the widget

Install Amplify UI React library
````
npm install @aws-amplify/ui-react
````
import AmplifyAuthenticator
````javascript
import {AmplifyAuthenticator} from '@aws-amplify/ui-react';
````
Wrap CreatePost with authentication
````javascript
function CreatePost() {
  ...
  return (
    <AmplifyAuthenticator>
      <form onSubmit={onSubmit}>
        ...
      </form>
    </AmplifyAuthenticator>
  );
}
````
Now when running the application we should see this Amplify sign in form instead of CreatePost widget

![amplify-sign-in](https://miro.medium.com/max/928/1*9NoGfsG-epUQh5vyUrRqWg.png)

#### Users can now sign up and sign in to the application

### Connect the user to the post and restrict access for others

Update the API authentication settings
````
amplify api update
````
Keep existing settings (service _GraphQL_, auth type _API key_), select _Yes_ for adding additional auth type and select _Amazon Cognito User Pool_
````
amplify api update
? Please select from one of the below mentioned services: GraphQL
? Select from the options below Update auth settings
? Choose the default authorization type for the API API key
? Enter a description for the API key: public
? After how many days from now the API key should expire (1-365): 365
? Configure additional auth types? Yes
? Choose the additional authorization types you want to configure for the API Amazon Cognito User Pool
Cognito UserPool configuration
Use a Cognito user pool configured as a part of this project.

GraphQL schema compiled successfully.

Edit your schema at C:\Users\amitz\Documents\GitHub\aws-amplify-workshop\amplify\backend\api\awsamplifyworkshop\schema.graphql or place .graphql files in a directory at C:\Users\amitz\Documents\GitHub\aws-amplify-workshop\amplify\backend\api\awsamplifyworkshop\schema
Successfully updated resource
````


Enhance the Post model schema with auth configuration as so:
amplify/backend/api/awsamplifyworkshop/schema.graphql
```graphql
type Post
@model
@auth(rules: [
  {allow: public, operations: [read]},# public access for read
  {allow: owner, ownerField: "username"}, # full access to owner, owner mapped by username field
])
# adding query to the model to retrieve posts by username
@key(name: "postByUsername", fields: ["username"], queryField: "postByUsername")
{
  id: ID!
  title: String!
  body: String
  username: String # adding username field
}
```
Change CreatePost::onSubmit to map the username to the post by adding single prop to the API
````javascript
authMode: 'AMAZON_COGNITO_USER_POOLS'
````
```javascript
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
```

Deploying the changes
````
amplify push
````
````
λ amplify push
√ Successfully pulled backend environment dev from the cloud.

Current Environment: dev

| Category | Resource name              | Operation | Provider plugin   |
| -------- | -------------------------- | --------- | ----------------- |
| Api      | awsamplifyworkshop         | Update    | awscloudformation |
| Auth     | awsamplifyworkshopc4bf374f | No Change | awscloudformation |
? Are you sure you want to continue? Yes

GraphQL schema compiled successfully.

Edit your schema at C:\Users\amitz\Documents\GitHub\aws-amplify-workshop\amplify\backend\api\awsamplifyworkshop\schema.graphql or place .graphql files in a directory at C:\Users\amitz\Documents\GitHub\aws-amplify-workshop\amplify\backend\api\awsamplifyworkshop\schema
? Do you want to update code for your updated GraphQL API Yes
? Do you want to generate GraphQL statements (queries, mutations and subscription) based on your schema types?
This will overwrite your current graphql queries, mutations and subscriptions Yes
| Updating resources in the cloud. This may take a few minutes...
...
...
...
√ Generated GraphQL operations successfully and saved at src\graphql
√ All resources are updated in the cloud

GraphQL endpoint: https://xxxxxxxxxxxxxxxxxxxx.appsync-api.us-east-1.amazonaws.com/graphql
GraphQL API KEY: xxx-xxxxxxxxxxxxxxxxxxxxxxxx
````
