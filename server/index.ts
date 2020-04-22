import express, { NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import mongo from 'connect-mongo';

import DATABASEURL from './config/dburl.json';
import SECRETKEY from './config/secret_key.json';
import User from './schema/User';

const MongoStore = mongo(session);

const server = express();

mongoose.connect(`${DATABASEURL}workflow-manager?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).catch((error) => console.log('MongoDB connection error. Could not establish database connection. Please make sure MongoDB is running.', error));

mongoose.connection.on('error', (error) => {
  console.log('MongoDB connection error. Database connection has been broken. Please make sure MongoDB is running.', error);
});

server.use(bodyParser.json());

server.use(session({
  name: 'workflow_sid',
  resave: false,
  saveUninitialized: false,
  secret: SECRETKEY,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 48,
    secure: false, // needs to be changed to true after receiving ssl certificate
    httpOnly: false,
  },
}));

server.use(express.static(path.join(__dirname, 'build')));

server.post('/api/user/register', (req, res, next) => {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    isVerified: false,
    organizations: [],
  });
  newUser.save((err, user) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) next(new Error('This email address is already taken. Try another one.'));
      else next(new Error('MongoDB error. Unable to save user data to database.'));
    } else if (!req.session) next(new Error('Unable to create new session.'));
    else {
      req.session.userId = user._id;
      return res.redirect(303, '/');
    };
  });
});

server.post('/api/user/signin', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) next(new Error('Wrong email address.'));
      else if (!req.session) next(new Error('Unable to create new session.'));
      else {
        req.session.userId = user._id;
        return res.send({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          isVerified: user.isVerified,
          organizations: user.organizations
        });
      };
    })
    .catch(error => next(new Error(`MongoDB error. Unable to retrieve data from database. ${error}`))); 
});

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

server.use((err: Error, req: express.Request, res: express.Response, next: NextFunction) => {
  res.status(500).send(err.message);
});

module.exports = server;
export default server;
