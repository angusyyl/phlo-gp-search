# GP Search

GP Search is a web app that shows doctors nearby a location. The app is implemented using a Koa backend and a React frontend, both written in Typescript.

To run both the frontend and backend, you must have Node and Yarn installed. Run `yarn install` and then `yarn start` in the root of the repo. You can now access the web app at [http://localhost:1234/](http://localhost:1234/).

Once you have the app running and understand the codebase, it would be great if you could work through the stages of this technical challenge below.

Your answers will form the basis for our discussions during the technical interview stage.

Please do not spend any more than two hours on this challenge.

## Stage 1 - Implementing Changes

Detail how you would implement the product changes below.

_You can demonstrate your approach to implementing these changes by making changes to the codebase or writing a description of how you would implement each change. Please include details of both the code involved and any changes to the user experience._

1. Display doctors near the end user's current location. The app currently only displays doctors near central Glasgow.
I modified it in the code base.

2. Display 100 nearby doctors. The app currently only displays 20 doctors.
I think at max. 60 nearby results can be returned as per this link?
https://developers.google.com/maps/documentation/places/web-service/search-nearby#PlaceSearchPaging

3. Add a list view of the doctors to be displayed alongside the map. Clicking on a doctor in the list should highlight the doctor on the map and vice versa.
I modified it in the code base.

## Stage 2 - Developer Experience

Briefly answer the following questions (a few bullet points or high level answer):

1. From a technical perspective, what would you change in the current implementation of this app? What improvements would you make?
a. add a loading animation before the map loads completely
b. secure the API endpoints
c. don't hardcode the API key inside the project code, store it with secret management service, for example, Google Secret Manager
d. add a distance filter

2. If you built this app from scratch, what tools would you use, and why?
For the frontend, I would go for Angular or React because both are robust for web & mobile app development.
For the backend, Koa is definitely a good choice because the same Javascript can be used. But I would also consider FastAPI with Python based as it sounds to have high performance and fast to code and easy to learn. It also provides automatic documentation, autocompletion, data validation, security and many more.

3. What technology are you most excited about right now?
A.I.
It would be good to add on a virtual chatbox or assistant to this app.

4. What is "good code" to you?
a. easy to read (e.g. follow naming convention, don't repeat code, have comments & documentated);
b. easy to maintain/ scale (e.g. clear and separate purpose for each class or function, code reuse)
c. testable by automated test suites

## Stage 3 - Extending the Product

Briefly answer the following questions (a few bullet points or high level answer):

1. Given a user can find doctors nearby to their location, what other functionality would you add to the application to make it useful to real users?
a. able to make an appointment with the doctors
b. able to see and leave reviews of the doctors
c. able to see the historical medical records of the users with the doctors

2. As our user base grows, using Google's APIs will have an associated running cost. How could we reduce the number of API calls we are making to keep running costs low?
a. make sure unused API keys are deleted
b. store and cache API call results if possible
c. request only the Place Data Fields that we need
d. use static map or static street view instead of dynamic map or dynamic street view, 
    e.g. in a scenario that displays the delivery route only where user interactions is not needed
e. set a budget alert to keep monitoring and reviewing the API usage