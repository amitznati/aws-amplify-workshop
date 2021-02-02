# Full stack application workshop with Amazon Amplify

Nowadays there a more companies that offering free full-stack architecture, ready to use within few clicks

those architectures often offer: Authentication,Storage, REST/GraphQL API, DB, Client hosting, cloud functions, notification service and more

i.e.
mongoDB Realm, Google Firebase, Amazon Amplify:


<div style="text-align: center">
<img src="./full-stack-offers.png" alt="full-stack" width="70%" />
</div>

In this workshop there are steps to configure full stack infrastructure on Amazon cloud using [Amazon Amplify]()

by following the steps you'll be able to configure:

* **Amplify project** - backend project on Amazon cloud, with capabilities to add Amplify features such as API, Storage, Authentication etc. with secure connection between them.
* **API** - GraphQL API gateway with an auto generated queries, resolvers and subscriptions by defining GraphQL models schema. the API will be accessible for _READ_ by API key (guests users) and for _READ/WRITE_ by **Amazon Cognito** authentication (registered users).
* **Authentication** - Amazon Cognito User Pool - ready to use authentication service include full sign up-in flow, reset/forgot password, MFA process and more. to handle the authentication process views we'll use Amplify React UI library.
* **Storage** - Amazon CloudFront + Amazon S3 Bucket - We'll add Amazon S3 Bucket where users can uploading files/images, the Bucket's security configuration will be: READ access for guests users and READ/WRITE access for registered users.
  the Amplify Storage library will upload the file to the S3 bucket and return the S3 Object key of the file in the bucket, for viewing the image will need to download it using the Storage library or using Amplify React UI component (_AmplifyS3Image_) and pass the object key as the imageKey prop.
  This method is not so intuitive and also the download of the file will be slow, so we'll connect the S3 Bucket to Amazon CloudFront for fast distribution and view the image by using the file URL in CloudFront. 
* **Frontend Hosting** - _AWS Amplify offers a fully managed service for deploying and hosting static web applications, with built-in CI/CD workflows that accelerate your application release cycle_.
we'll host our client application by connect is to the GitHub project.
  
### This project infrastructure architecture diagram 
![amplify-diagram](amplify-diagram.png)


## Steps
1. [Start](https://github.com/amitznati/aws-amplify-workshop/tree/master/1-Start#1-start)
2. [Init Amplify project](https://github.com/amitznati/aws-amplify-workshop/tree/master/2-Init%20Amplify%20project#2-init-amplify-project)
3. [Add GraphQL API](https://github.com/amitznati/aws-amplify-workshop/tree/master/3-Add%20GraphQL%20API#3-add-graphql-api)
4. [Add Authentication](https://github.com/amitznati/aws-amplify-workshop/tree/master/4-Add%20Authentication#4-add-authentication)
5. [Add Storage](https://github.com/amitznati/aws-amplify-workshop/tree/master/5-Add%20Storage#5-add-storage)
6. [Connect the storage to Amazon CloudFront](https://github.com/amitznati/aws-amplify-workshop/tree/master/6-Connect%20the%20storage%20to%20Amazon%20CloudFront#6-connect-the-storage-to-amazon-cloudfront)
7. [Hosting the client application on Amplify frontend](https://github.com/amitznati/aws-amplify-workshop/tree/master/7-Hosting%20the%20client%20application%20on%20Amplify%20frontend#7-hosting-the-client-application-on-amplify-frontend)
