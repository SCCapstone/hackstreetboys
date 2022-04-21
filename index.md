![alt text](/Documentation/branding/banner.png)
# Fridger
Fridger is a progressive web application for anyone who likes to cook. Users can create, review, and share their food creations with others in the community. This innovative platform will include features such as integrated sharing functionality, recipe reviews, and a recipe matching function that uses the ingredients that you put into your online pantry and your personal preferences to curate the perfect list of recipes to fit your tastes. Fridger has its own recipe rating and review system which makes it easy to see what's popular! Our goal tracking platform is perfect for those who are trying to meet their health objectives through what they eat. Try Fridger today!
## Highlights
Fridger provides the full functionality of creating and viewing recipes! Even without an account, you are able to view tons of recipes like the one below:
![pb&banana](/Documentation/branding/pb&banana.png)

Upon creating an account, you have more functionality! You will be welcomed by a homescreen full of recent recipes!
![loggedin](/Documentation/branding/loggedin.png)

You can leave reviews, ratings, and add recipes to your favorites!
One of our favorite highlights is the Pantry feature. Here, you can load ingredients that already in the app (you may add the the ingridents section if they are not already there) into your pantry! If you have the ingredients to create a recipe that appears in the app, it will appear on the right! This helps eliminate the stress of deciding what to cook. If you have your own recipe, you can add it to the app for your future use and for others to discover!
![pantry-updated](/Documentation/branding/pantry.png)

You can also log a goal of yours through our goals feature. This app wants to encourage you to stick with the reason you've decided to join the app. Once you create a goal, it will always appear! You may create new goals if you change your mind or want to reach smaller goals along the way. This allows you to see your history of where you were and where you're going!
![goal](/Documentation/branding/goal.png)

We hope this app helps you with all your eating and goal tracking needs!
## Getting Started
* Go to https://fridger.recipes/
* Feel free to use the app without an account, or create an account for more options & features!
* Upon creating an account, make sure to click the verification link that was sent to your email so that you can log in.
* The hamburger menu on the top left can take you to many pages!
* Browse/add recipes, ingredients, reviews, goals...
* Add ingredients to your pantry to see what you can make this evening!
* Don't see an ingredient available to add in your pantry? Head to the ingredients page and add it to our database! Once added, it will be available to add to your pantry.
* Add recipes to your favorites for your convenience.
## Take a look at Fridger by watching our demo!
[Fridger Final Demo](https://youtu.be/dtmCk0hUBsU)
## About Us
[About Page](./about.html)
## Our Stack
![stack](/Documentation/branding/stack.png)
## Details, Specifications, External Requirements
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
### Style
When we build this project, we will rely on this React style guide from Airbnb to keep our code consistent: 
<https://github.com/airbnb/javascript/tree/master/react>
And for TypeScript:
https://google.github.io/styleguide/tsguide.html
### Setup
Clone this repo.\
To use backend locally, install MySQL Community Server and MySQL Workbench/CLI; defaulting running on `localhost:8080`\
To use backend with cloud, use `https://api.fridger.recipes` \
To use frontend locally, run `npm install` to install all packages. Use `npm ci` if you're using an automated environment.\
### Running
To run the Ionic application in a development environment use the command \
`ionic serve` \
and to run Spring Boot use \
`./mvnw spring-boot:run`
## Deployment
To make a production build of the React JS/Ionic frontend, we will use the command \
`ionic build` \
which will produce static HTML files. 
Then run the deployment command\
`gcloud app deploy`\
For the backend, we will use the command \
`mvn clean package appengine:deploy -P cloud-gcp` \
after configuring Google Cloud Platform in the application.properties file, updating relevant manifests, and following the setup commands outlined at https://www.baeldung.com/spring-boot-google-app-engine. The backend will be in a JAR or WAR file to be deployed after configuring Google App Engine to run Java.
## Testing
The unit tests are in `/backend/src/test/java/recipes/fridger/backend`\
The behavioral tests are in `/frontend/src/tests`
### Testing Technology
For our unit tests we're using [Mockito](https://site.mockito.org/) through the spring boot testing library.\
For our behavioral tests we're using [Jest.js](https://jestjs.io/docs/tutorial-react).
### Running Tests
To use our unit tests, have the code running via `./mvnw spring-boot:run` and then run `./mvnw test`\
We reccomend using IntelliJ or Eclipse to run these tests so it's easier to see the code coverage.\
To use our behavioral tests run `npm test`
