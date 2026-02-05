# HOMEWORK

## Episode 03
  - Create a repository
  - Initialize the repository
  - node_modules, package.json, package-lock.json
  - Install express
  - Create a server 
  - Listen to port 7777
  - Write request handlers for /test, /home
  - Install nodemon and update the scripts inside the package.json
  - Difference betwenn caret and tilda (^ & ~)
  - What are dependencies
  - What is the use of -g
  
## Episode 04
  - package.json vs package-lock.json (which one to be in guthub)
  - Play with routes and route extensions
  - installing postman and create workspace/collection/request
  - Write logic for GET,POST,PATCH,DELETE and test in postman
  - Play with reular expressions (regex)
  - Explore dynamic routing 

## Episode 05
  - Try route handler and multiple-rote handlers
  - try using next() for multiple route handlers
  - use array of route handlers. app.use("/route",rh1,[rh2,rh3],rh4,rh5)
  - Explore middleware and how express js handles request behind the scenes.
  - learn http status code
  - learn differnece between use and all
  - Write dummy middlewares for admin,user(except for login)
  - Error handling using app.use

## Episode 06
  - Create a free cluster in mongodb official website (Mongo Atlas)
  - install mongoose library
  - connect application to the database "Connection-url"/devTinder
  - call the connectDB function and connect to database before starting application on server.
  - create a user schema & user model
  - create a POST /signup api to add data to database
  - push some documents from postman 

## Episode 07
  - difference between json and javascript object
  - Add the express.json() middleware 
  - make /signup api dynamic to receive data from the end user.
  - User.findOne will it always return first document? any other ways to retrive other documents in some random order
  - build an api to get a user
  - build another api to get all the suers from the DB
  - API - get user by id
  - create a delete user api
  - difference between patch and put
  - create an api to update user
  - explore mongoose documentation (Model)
  - create an api which updates user by user email
  - explore Model.findOneAndUpdate and it options param.

## Episode 08
  - Explore the schemaTypes from the documentation
  - add required,unique,lowercase,min,minLength,trim
  - Add default
  - create a custom validate function for gender
  - Improve the DB schema - PUT all appropriate validations in the schema
  - add timestamps to the schema
  
## Episode 09
 - Validate data in SignUp API
 - Install bcrypt package
 - Create passwordhash using bcrypt.hash & save the users with the encrypted password.
 - Create login API
 - compare password

## Episode 10
 - install cookieParser
 - send a dummy cookie to the user
 - create GET /profile and check if you get the cookie back
 - install jsonwebtoken
 - In login API,after email and password check create a JWT Token and send back to the user inside cookies
 - read cookies inside profile api and find out the loggind user.
 - userAuth middleware
 - create a sendConnectionRequest and use userAuth middleware.
 - set the expire of the jwt token 
 - create userSchema method to getJWT()
 - create userSchema method to validatePassword(passwordInput)

## Episode 11
- Explore tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple routes under respective routers
- Read documentation for express.Router
- Create routes folder managing auth,profile,request Routers
- Create authRouter,profileRouter,requestRouter
- Import these routers in app.js
- Create a POST /logout API
- Creata a PATCH /profile/edit
- Create a PATCH profile/password =>Forget password API
- Make you validate all data in every POST,PATCH apis

## Episode 12
- Create connection request Schema
- Send connection Request API
- Proper Validation of Data
- Think about all corner cases
- $or query in mongo
- Read more about indexex in mongodb
- Why do we need index in DB?
- What is the advantage and disadvantage of creating index?


