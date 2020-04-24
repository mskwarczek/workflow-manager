import express, { NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import mongo from 'connect-mongo';
import bcrypt from 'bcrypt';

import DATABASEURL from './config/dburl.json';
import SECRETKEY from './config/secret_key.json';
import User from './schema/User';
import { ServerError } from './types';

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
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return next(new ServerError(500, 'Unable to hash password.'));
    else {
      let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        isVerified: false,
        organizations: [],
      });
      newUser.save((err, user) => {
        if (err) {
          if (err.name === 'MongoError' && err.code === 11000) return next(new ServerError(409, 'This email address is already taken. Try another one.'));
          else return next(new ServerError(500, 'MongoDB error. Unable to save user data to database.'));
        } else if (!req.session) return next(new ServerError(500, 'Unable to create new session.'));
        else {
          req.session.userId = user._id;
          return res.sendStatus(200);
        };
      });
    };
  });
});

server.post('/api/user/signin', (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) return next(new ServerError(401, 'Wrong email address.'));
      else bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) return next(new ServerError(500, 'Unable to compare password with hash.'));
        else if (!result) return next(new ServerError(401, 'Wrong password.'));
        else if (!req.session) return next(new ServerError(500, 'Unable to create new session.'));
        else {
          req.session.userId = user._id;
          return res.redirect(303, '/api/user');
        };
      });
    })
    .catch(error => next(new ServerError(500, `MongoDB error. Unable to retrieve data from database. ${error}`, error))); 
});

server.post('/api/user/signout', (req, res, next) => {
  if (!req.session) return next(new ServerError(500, 'Unable to access session.'));
  req.session.destroy(error => {
    if (error) return next(new ServerError(500, `Unable to end session. ${error}`, error));
    else {
      res.clearCookie('workflow_sid');
      return res.sendStatus(200);
    };
  });
});

server.use((req, res, next) => {
  if (req.session && !req.session.userId) {
    return next(new ServerError(401, 'You need to sign in to continue.'));
  };
  return next();
});

server.get('/api/user', (req, res, next) => {
  if (!req.session) return next(new ServerError(500, 'Unable to read session data.'));
  else {
    User.findOne({ _id: req.session.userId })
      .then(user => {
        if (!user) return next(new ServerError(500, 'Unable to read user data.'));
        else {
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
      .catch(error => next(new ServerError(500, `MongoDB error. Unable to retrieve data from database. ${error}`, error))); 
  };
});

server.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../build/index.html'));
});

server.use((err: ServerError, req: express.Request, res: express.Response, next: NextFunction) => {
  return res.status(err.status || 500).send(err.message || 'Server error. Something went wrong');
});

module.exports = server;
export default server;
