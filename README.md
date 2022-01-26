# Project Auth

This week's project was a pair-programming with me and Helena Wiklund and our task was to built a full stack project.

The problem

The backend part of the project is an API built with MongoDB and Mongoose. There are 2 endpoints for Sign In and Sign Up and one endpoint for authorized users.
The authentication for the user is done with an Access Token. The Access Token is encrypted using crypto.randomBytes(128).toString("hex"), and the password of the user is hashed and salted using bcrypt. The frontend part is a a form for registering and signing in, and a user page. There, the user can access the secret content that he/she  entered in the registration form when signed up. We display error messages for 400, 401, 403 and 11000. The styling of the page was kept to minimum due to my sickness with COVID that week. The frontend part is built using React and Redux.


Take a look:
https://priceless-mcnulty-65ee7c.netlify.app/
