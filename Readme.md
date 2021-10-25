# Fridger

Fridger is a progressive web application for anyone who likes to cook. Users can create, review, and share their food creations with others in the community. This innovative platform will include features such as integrated sharing functionality, recipe reviews, and a recipe matching function that uses the ingredients that you put into your online pantry and your personal preferences to curate the perfect list of recipes to fit your tastes. We’d also like to implement multi-user experiences for guests, verified users, and administrators allowing for OAuth and 2-Factor authentication.

## External Requirements

In order to build this project you first have to install:

* [Node.js](https://nodejs.org/en/)
* [Java Spring Boot](https://spring.io/projects/spring-boot)

To install Java Spring boot and other back-end dependencies: \
`mvn install` \
IDE: IntelliJ IDEA or VSCode \
To install React and other front-end dependencies: \
`npm install` \
IDE: VSCode

## Style
When we build this project, we will rely on this React/JSX style guide from Airbnb to keep our code consistent: 
<https://github.com/airbnb/javascript/tree/master/react>

## Setup

<><><><><>

## Running

To run the Ionic application in a development environment use the command \
`ionic serve` \
and to run Spring Boot use \
`./mvnw spring-boot:run`

# Deployment

To make a production build of the React JS/Ionic frontend, we will use the command \
`ionic build` \
which will produce static HTML files. For the backend, we will use the command \
`mvn clean package appengine:deploy -P cloud-gcp` \
after configuring Google Cloud Platform in the application.properties file, updating relevant manifests, and following the setup commands outlined at https://www.baeldung.com/spring-boot-google-app-engine. The backend will be in a JAR or WAR file to be deployed after configuring Google App Engine to run Java.

# Testing

In 492 you will write automated tests. When you do you will need to add a
section that explains how to run them.

The unit tests are in `/test/unit`.

The behavioral tests are in `/test/casper/`.

## Testing Technology

In some cases you need to install test runners, etc. Explain how.

## Running Tests

Explain how to run the automated tests.

# Authors

Caroline Boozer: ceboozer@email.sc.edu \
Quinn Nisbet: qnisbet@email.sc.edu \
Adam Frederiksen: apf1@email.sc.edu \
Jadon Schuler: schulert@email.sc.edu \
Andrew Bernhardt: aeb30@email.sc.edu
