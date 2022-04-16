![alt text](https://github.com/SCCapstone/hackstreetboys/blob/main/Documentation/branding/banner.png?raw=true)
# Fridger
Fridger is a progressive web application for anyone who likes to cook. Users can create, review, and share their food creations with others in the community. This innovative platform will include features such as integrated sharing functionality, recipe reviews, and a recipe matching function that uses the ingredients that you put into your online pantry and your personal preferences to curate the perfect list of recipes to fit your tastes. Fridger has its own recipe rating and review system which makes it easy to see what's popular! Our goal tracking platform is perfect for those who are trying to meet their health objectives through what they eat. Try Fridger today!
## Take a look at Fridger by watching our demo!
[Fridger Demo - Placeholder Video](https://www.youtube.com/watch?v=z65AUrZuy1Y)
## About Us
[About Page](./about.html)
## External Requirements
In order to build this project you first have to install:
* [Node.js](https://nodejs.org/en/)
* [Java Spring Boot](https://spring.io/projects/spring-boot)

To install Java Spring boot and other back-end dependencies: \
`mvn install` \
IDE: IntelliJ IDEA or VSCode \
To install React and other front-end dependencies: \
`npm install` \
IDE: VSCode\
MySQL Community Server and MySQL Workbench/CLI, if using local machine for backend.
## Style
When we build this project, we will rely on this React style guide from Airbnb to keep our code consistent: 
<https://github.com/airbnb/javascript/tree/master/react>
And for TypeScript:
https://google.github.io/styleguide/tsguide.html
## Setup
Clone this repo.\
To use backend locally, install MySQL Community Server and MySQL Workbench/CLI; defaulting running on `localhost:8080`\
To use backend with cloud, use `https://api.fridger.recipes` \
To use frontend locally, run `npm install` to install all packages. Use `npm ci` if you're using an automated environment.\
## Running
To run the Ionic application in a development environment use the command \
`ionic serve` \
and to run Spring Boot use \
`./mvnw spring-boot:run`
# Deployment
To make a production build of the React JS/Ionic frontend, we will use the command \
`ionic build` \
which will produce static HTML files. 
Then run the deployment command\
`gcloud app deploy`\
For the backend, we will use the command \
`mvn clean package appengine:deploy -P cloud-gcp` \
after configuring Google Cloud Platform in the application.properties file, updating relevant manifests, and following the setup commands outlined at https://www.baeldung.com/spring-boot-google-app-engine. The backend will be in a JAR or WAR file to be deployed after configuring Google App Engine to run Java.
# Testing
The unit tests are in `/backend/src/test/java/recipes/fridger/backend`\
The behavioral tests are in `/frontend/src/tests`
## Testing Technology
For our unit tests we're using [Mockito](https://site.mockito.org/) through the spring boot testing library.\
For our behavioral tests we're using [Jest.js](https://jestjs.io/docs/tutorial-react).
## Running Tests
To use our unit tests, have the code running via `./mvnw spring-boot:run` and then run `./mvnw test`\
We reccomend using IntelliJ or Eclipse to run these tests so it's easier to see the code coverage.\
To use our behavioral tests run `npm test`
# Authors
Caroline Boozer: ceboozer@email.sc.edu \
Quinn Nisbet: qnisbet@email.sc.edu \
Adam Frederiksen: apf1@email.sc.edu \
Jadon Schuler: schulert@email.sc.edu \
Andrew Bernhardt: aeb30@email.sc.edu
