# 7. Hosting the client application on Amplify frontend

_AWS Amplify offers a fully managed service for deploying and hosting static web applications, with built-in CI/CD workflows that accelerate your application release cycle. Simply connect your application's code repository in the Amplify console, and changes to your front end and backend are deployed in a single workflow on every code commit._

Deployment of the frontend application will be done via Amplify console

* #### Go Amplify console and select your application
![amplify-console](amplify-console.png)
  
* #### Select a GitHub application and click _connect branch_
![frontend-github](frontend-gitHub.png)
  
* #### Select the application repository and branch and click _Next_
![add-repo-branch](add-repo-branch.png)

* #### Configure build settings
![build-settings1](configure-build-settings1.png)
![build-settings2](configure-build-settings2.png)
  make sure the _Auto-detected frameworks_ detect Amplify and we have _Backend deployments_ section, 
  select the env (dev) and create new _service role_.
  Click _Next_
  
* #### Review and click _Save and deploy_
![review](review.png)

* #### Deployment process will start
![deployment-start](deploy-start.png)

* #### After deployment done we can open the application from Amazon URL
![deploy-end](deploy-end.png)

# Our application is _app_ in the air 🚀
![app](app.png)
