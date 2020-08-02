# Authentication & Authorization - MongoDB, REACT, EXPRESS, NODE.JS, PASSPORT.JS

![Image of HeaderPage]()
A simple boilerplate application for authentication and authorization using the MERN STACK.

This Application includes some security features listed below

```
1. limitation on the body payload using body-parser
   app.use(express.json({limit: '10kb})) // This limits the data size a user can pass.

2. Express-rate-limit-dependency. This basically sets the maximum request per each user before they get locked out
   const limit = rateLimit({
   max: 100, // max requests
   windowMs: 60 _ 60 _ 1000, // 1 Hour
   message: "Too many requests", // message to send
   });

3. xss-clean used to prevent XSS Attacks
   app.use(xss())

4. Then finally helmet which is a collection of middleware functions
   app.use(helmet())

```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Things you need to install the software and how to install them

```
Make sure you have node.js  and npm . node v10.16.3 (https://nodejs.org/en/download/)installed
How to install node.js and NPM on windows (https://treehouse.github.io/installation-guides/windows/node-windows.html)
How to install node.js and NPM on mac (https://treehouse.github.io/installation-guides/mac/node-mac.html)
```

```
Make sure you have installed MongoDB community on your local machine (https://www.mongodb.com/try/download/community)
How to install MongoDB Community (https://docs.mongodb.com/manual/administration/install-community/)
```

```
Make sure you have installed MongoDB Compass (https://www.mongodb.com/products/compass)
You only need this to easily manage your database
```

```
Create an email testing account with Ethereal (https://ethereal.email/create)
```

### Installing

A step by step series of examples that tell you how to get a development env running

```
Download or fork this repo

```

```
cd to the root folder

```

open the .env file and provide the following...

```
JWT_SECRET='your own secret'
EMAIL_ADDRESS='the email address you created in ethereal for testing nodemailer'
EMAIL_PASSWORD='your password to the email address on ethereal'

```

open the server.js file in the config folder and provide the following

```
Replace Auth in local host path with the name of the database you created with mongoDB.

mongoose.connect(
  "mongodb://localhost:27017/Auth",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("successfully connected to database");
  }
);

```

open the email.config.js file in the config folder and provide the following

This were all set in your .env file

```
module.exports = {
USER: process.env.EMAIL_ADDRESS, // no need to change anything here
PASS: process.env.EMAIL_PASSWORD, // no need to change anything here
};

```

Open your terminal

```
type : npm install

```

Cd into the client folder

open the package.json file and ensure you have your proxy set up

```
 "proxy": "http://localhost:7000" // I listened on port 7000 in this case.

This is needful in other not to repeat the directory all the time in the frontend request.
It gets add automatically.
```

Open your terminal

```
type : npm install //make sure now you are in the client folder

```

in the terminal opened for the root folder

```
type : npm start

```

in the terminal opened for the client folder

```
type: npm start

```

## Deployment

Depending on your deployment platform

## Built With

- [Node](https://nodejs.org/en/download/) - The web framework used
- [ReactStrap](https://reactstrap.github.io) - The web framework used
- [MongoDB](https://www.mongodb.com/try/download/community) - Used to create local database

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository]().

## Authors

- **Adeola Oni** - _Initial work_ - [Oneil213](https://github.com/oneil213/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- CREATIVE TIM
