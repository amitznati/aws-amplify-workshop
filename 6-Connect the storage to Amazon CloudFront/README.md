# 6. Connect the storage to Amazon CloudFront

few words on CloudFront, fast distribution, short url...

[resource](https://github.com/aws-amplify/amplify-cli/issues/1910)

#### Create cloudfront distribution
https://console.aws.amazon.com/cloudfront/home?region=eu-west-2#create-distribution

Select a delivery method for your content > Web > Get started
* Origin Domain Name: my-image-storage...
* Origin Path: /public
* Default Cache Behavior Settings > Viewer Protocol Policy > Redirect HTTP to HTTPS
* Restrict Bucket: Yes
* Origin Access Identity: Create a New Identity
* Grant Read Permissions on Bucket: Yes, Update Bucket Policy
* Get image cdn url

Let's say I upload an image file in the S3 bucket with the key public/my-image-123.jpg, this image will be available through the url https://xxx.cloudfront.net/my-image-123.jpg

#### Refactor the code

We can now save the image URL instead of the S3 Object key in the postImage field 
App.js::CreatePost

From 
````javascript
const onSubmit = e => {
    ...
          API.graphql({
            query: updatePost,
            variables: {input: {id: postId, postImage: storageRes.key}},
            ...
````

Change to
```javascript
const onSubmit = e => {
    ...
          API.graphql({
            query: updatePost,
            variables: {input: {id: postId, postImage: `https://d33ga3e83485t5.cloudfront.net/${storageRes.key}`}},
            ...
```
_Sure we should use env variable for this URL but for this demonstration I'll use hardcoded string_

App.js::PostsList

From
```javascript
function PostsList() {
        ...
          {post.postImage &&
            <AmplifyS3Image imgKey={post.postImage} />
          }
        ...
```

Change To
```javascript
function PostsList() {
        ...
          {post.postImage &&
            <img src={post.postImage} alt={post.title} />
          }
        ...
```

## Next: [7. Hosting the client application on Amplify frontend](https://github.com/amitznati/aws-amplify-workshop/tree/master/7-Hosting%20the%20client%20application%20on%20Amplify%20frontend#7-hosting-the-client-application-on-amplify-frontend)
